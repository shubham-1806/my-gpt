import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import amqp, { Message } from 'amqplib/callback_api';
import {
    research_paper_consumer_queue,
    research_paper_producer_queue,
} from '../src/Config/config.ts';
import { windowToPageEvents, pageToWindowEvents } from '../src/Config/eventConfig.ts';
import { ModelCommunicationMessage, ModelCommunicationResponse } from '../src/Config/types';
import { ChatHistory } from '../src/Pages/Chat/Chat.tsx';

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
process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
    console.log(path.join(__dirname, '/logo.svg'));
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, '/logo.svg'),
        // frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.menuBarVisible = false;
    win.maximize();

    amqp.connect(
        'amqp://localhost',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function (error0: any, connection: amqp.Connection) {
            if (error0) {
                throw error0;
            }
            rabbitmqconnection = connection;
            connection.createChannel(function (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                error1: any,
                channel: amqp.Channel,
            ) {
                if (error1) {
                    throw error1;
                }
                const consuming_queue = research_paper_consumer_queue;
                const producing_queue = research_paper_producer_queue;
                channel.assertQueue(consuming_queue, { durable: true });
                //send only the required fields from the json to the pages please
                channel.consume(consuming_queue, function (msg: Message | null) {
                    if (msg && msg.content) {
                        try {
                            const response = JSON.parse(
                                msg.content.toString(),
                            ) as ModelCommunicationResponse;
                            console.log(response);
                            if (response.type === 'summary') {
                                win?.webContents.send(windowToPageEvents.SummariseEvent, response);
                            } else if (response.type === 'grammar') {
                                win?.webContents.send(
                                    windowToPageEvents.GrammarCheckEvent,
                                    response,
                                );
                            } else if (response.type === 'chat') {
                                win?.webContents.send(windowToPageEvents.ChatEvent, response);
                            }else if(response.type==='upload'){
                                win?.webContents.send(windowToPageEvents.UploadChatDocument,response);
                            } 
                            else {
                                throw new Error('Unknown type of response');
                            }
                        } catch (err) {
                            console.log('error parsing', err);
                        }
                        channel.ack(msg);
                    }
                });

                //Events which trigger when the app wants to send messages to model
                ipcMain.on(pageToWindowEvents.SummariseEvent, (_event, filePath) => {
                    const messageToSend: ModelCommunicationMessage = {
                        type: 'summary',
                        content: filePath,
                    };
                    console.log(messageToSend);
                    channel.assertQueue(producing_queue, { durable: true });
                    channel.sendToQueue(
                        producing_queue,
                        Buffer.from(JSON.stringify(messageToSend)),
                    );
                });

                ipcMain.on(pageToWindowEvents.GrammarCheckEvent, (_event, content) => {
                    const messageToSend: ModelCommunicationMessage = {
                        type: 'grammar',
                        content: content,
                    };
                    channel.assertQueue(producing_queue, { durable: true });
                    channel.sendToQueue(
                        producing_queue,
                        Buffer.from(JSON.stringify(messageToSend)),
                    );
                });

                ipcMain.on(pageToWindowEvents.UploadChatDocument, (_event, filePath) => {
                    const messageToSend: ModelCommunicationMessage = {
                        type: 'upload',
                        content: filePath,
                    };
                    channel.assertQueue(producing_queue, { durable: true });
                    channel.sendToQueue(
                        producing_queue,
                        Buffer.from(JSON.stringify(messageToSend)),
                    );
                });

                ipcMain.on(pageToWindowEvents.ChatEvent, (_event, content: ChatHistory) => {
                    const messageToSend: ModelCommunicationMessage = {
                        type: 'chat',
                        query: content.query,
                        chat_history: content.chat_history,
                    };
                    channel.assertQueue(producing_queue, { durable: true });
                    channel.sendToQueue(
                        producing_queue,
                        Buffer.from(JSON.stringify(messageToSend)),
                    );
                });
            });
        },
    );

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
        // win.loadURL("https://github.com")
    } else {
        // win.loadFile('dist/index.html')
        // win.loadURL("https://github.com")
        win.loadFile(path.join(process.env.DIST, 'index.html'));
    }
}

// Disable GPU acceleration
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (rabbitmqconnection !== null) {
        rabbitmqconnection.close();
    }
    if (process.platform !== 'darwin') {
        app.quit();
        win = null;
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(createWindow);
