import { app, BrowserWindow,ipcMain } from "electron";
import path from "node:path";
import amqp, { Message } from "amqplib/callback_api";
import { research_paper_consumer_queue, research_paper_producer_queue } from "../src/Config/config.ts";

let rabbitmqconnection: amqp.Connection | null = null;

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
    console.log(path.join(__dirname, "/logo.svg"))
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, "/logo.svg"),
        // frame: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    win.menuBarVisible = false
    win.maximize();

    amqp.connect(
        "amqp://localhost",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (error0: any, connection: amqp.Connection) {
            if (error0) {
                throw error0;
            }
            rabbitmqconnection = connection;
            connection.createChannel(function (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                error1: any,
                channel: amqp.Channel
            ) {
                if (error1) {
                    throw error1;
                }
                const consuming_queue = research_paper_consumer_queue;
                const producing_queue = research_paper_producer_queue;
                channel.assertQueue(consuming_queue, { durable: true });
                channel.consume(consuming_queue, function (msg: Message | null) {
                    if (msg && msg.content) {
                        console.log(" [x] Received %s", msg.content.toString());
                        win?.webContents.send(
                            "gpt-message",
                            msg.content.toString()
                        );
                        channel.ack(msg);
                    }
                });

                // Test active push message to Renderer-process.
                ipcMain.on("gpt-send", (_event, filePath) => {
                    console.log("wanna send", filePath);
                    channel.assertQueue(producing_queue, { durable: true });
                    channel.sendToQueue(producing_queue, Buffer.from(filePath));
                });
            });
        }
    );

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
        // win.loadURL("https://github.com")
    } else {
        // win.loadFile('dist/index.html')
        // win.loadURL("https://github.com")
        win.loadFile(path.join(process.env.DIST, "index.html"));
    }
}

// Disable GPU acceleration
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if(rabbitmqconnection !== null) {
        rabbitmqconnection.close();
    }
    if (process.platform !== "darwin") {
        app.quit();
        win = null;
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(createWindow);
