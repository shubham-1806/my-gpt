import { useEffect, useState } from "react";
import { Header, Loader } from "../../Components";
import style from "./Saved.module.css";
import { useNavigate } from "react-router-dom";

interface ChatType {
  name: string;
  link: string;
}

const Saved = () => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        setChats([
            {
                name: "Critical Packet Prioritisation by Slack-Aware Re-routing in On-Chip Networks",
                link: "/"
            },
            {
                name: "Exploring the Impact of Artificial Intelligence on Healthcare",
                link: "/"
            },
            {
                name: "Critical Packet Prioritisation by Slack-Aware Re-routing in On-Chip Networks",
                link: "/"
            },
            {
                name: "Exploring the Impact of Artificial Intelligence on Healthcare",
                link: "/"
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
                                navigate(chat.link);
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
