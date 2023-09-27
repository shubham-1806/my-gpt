import { useEffect, useState } from "react";
import { Header, Loader } from "../../Components";
import style from "./Saved.module.css";
import { useNavigate } from "react-router-dom";


interface ChatBubbleProps {
    agent: "user" | "bot";
    message: string;
    isUpload: boolean;
    id: string;
}
interface ChatType {
  name: string;
  link: string;
  chatLists: ChatBubbleProps[];
}


const Saved = () => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        setChats([
            {
                name: "Criticalll Packet Prioritisation by Slack-Aware Re-routing in On-Chip Networks",
                link: "/chat",
                chatLists: [{ agent: "user",message:"hey",isUpload:false,id:"0"},{ agent: "bot",message:"heyyyy",isUpload:false,id:"1"}]
            },
            {
                name: "Exploring the Impact of Artificial Intelligence on Healthcare",
                link: "/chat",
                chatLists: [{ agent: "user",message:"hey",isUpload:false,id:"0"}]
            },
            {
                name: "Critical Packet Prioritisation by Slack-Aware Re-routing in On-Chip Networks",
                link: "/chat",
                chatLists: [{ agent: "user",message:"hey",isUpload:false,id:"0"}]
            },
            {
                name: "Exploring the Impact of Artificial Intelligence on Healthcare",
                link: "/chat",
                chatLists: [{ agent: "user",message:"hey",isUpload:false,id:"0"}]
            },
        ]);
        setLoading(false)
    }, []);

    return (
        <div className={style.mainContainer}>
            <Header />
            {loading ? <Loader /> :
                <div className={style.savedWrapper}>
                    {chats.map((chat, index) => (
                        <div
                            key={index}
                            className={style.savedBox}
                            onClick={() => {
                                navigate(chat.link, { state: chat.chatLists });
                            }}
                        >
                            {chat.name}
                        </div>
                    ))}
                </div>}
        </div>
    );
};

export default Saved;
