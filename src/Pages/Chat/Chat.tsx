import { ChatBubble, Header } from "../../Components";
import style from "./Chat.module.css";
import upload from "../../assets/upload.svg";
import enter from "../../assets/enter.svg";
import { useEffect, useRef, useState } from "react";

interface ChatBubbleProps {
  type: "user" | "bot";
  message: string;
  isUpload: boolean;
  id: string;
}

const Chat = () => {
    const [chatMessages, setChatMessages] = useState<ChatBubbleProps[]>([]);
    const [id, setId] = useState<number>(0);
    const messageRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const addUserChatBubble = (message: string) => {
        setChatMessages([
            ...chatMessages,
            {
                type: "user",
                message: message,
                isUpload: false,
                id: id.toString(),
            },
        ]);
        messageRef.current!.value = "";
        setId(id + 1);
    };

    const addUserChatBubbleOnFileUpload = (filePath:string,fileName:string)=>{
        console.log(filePath)
        setChatMessages([
            ...chatMessages,
            {
                type: "user",
                message: "Uploaded the Document " + fileName,
                isUpload: true,
                id: id.toString(),
            },
        ]);
        setId(id + 1);
    }

    const addBotChatBubble = (message: string) => {
        setChatMessages([
            ...chatMessages,
            {
                type: "bot",
                message: message,
                isUpload: false,
                id: id.toString(),
            },
        ]);
        setId(id + 1);
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFile = (e: any) => {
        const filePath = e.target.files[0].path;
        const splitPath = e.target.files[0].path.split("/");
        const splitName = splitPath[splitPath.length - 1];
        addUserChatBubbleOnFileUpload(filePath, splitName);
    };

    useEffect(() => {
        const scrollArray = document.getElementsByClassName("spacerToView");
        const scrollElement = scrollArray[scrollArray.length - 1];
        scrollElement?.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    },[id]);

    return (
        <div className={style.mainContainer}>
            <Header />
            <div className={style.chatWrapper}>
                <div className={style.chatPart}>
                    {chatMessages.map((chatMessage) => (
                        <ChatBubble
                            type={chatMessage.type}
                            message={chatMessage.message}
                            isUpload={chatMessage.isUpload}
                            key={chatMessage.id.toString()}
                        />
                    ))}
                </div>
                <div className={style.chatPrompt}>
                    <input
                        type="file"
                        id="file"
                        hidden
                        ref={inputRef}
                        onChange={(e) => uploadFile(e)}
                    />
                    <div className={style.uploadButton} onClick={()=>inputRef.current?.click()}>
                        <img style={{ scale: "0.7" }} src={upload} />
                    </div>
                    <div className={style.input}>
                        <input
                            type="text"
                            placeholder="Type to add a message..."
                            ref={messageRef}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.key === "Enter") {
                                    addUserChatBubble(messageRef.current?.value || "");
                                }
                            }}
                        />
                        <img
                            style={{ scale: "0.7", cursor: "pointer" }}
                            src={enter}
                            onClick={() => {
                                addBotChatBubble(messageRef.current?.value || "");
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
