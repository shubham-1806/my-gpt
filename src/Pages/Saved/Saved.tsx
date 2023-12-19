import { useEffect, useState } from 'react';
import { Header, Loader } from '../../Components';
import style from './Saved.module.css';
import { useNavigate } from 'react-router-dom';
import chatIcon from '../../assets/chat.svg';
import summariseIcon from '../../assets/summarise.svg';

interface ChatBubbleProps {
    agent: 'user' | 'bot';
    message: string;
    isUpload: boolean;
    id: string;
}
interface ChatType {
    name: string;
    summary: string;
    chatLists: ChatBubbleProps[];
}

const Saved = () => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setChats(localStorage.getItem('file_arrays') ? JSON.parse(localStorage.getItem('file_arrays')!) : []);
        setLoading(false);
    }, []);

    return (
        <div className={style.mainContainer}>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <div className={style.savedWrapper}>
                    {chats.map((chat, index) => (
                        <div key={index} className={style.savedBox}>
                            <div className={style.textDiv}>{chat.name}</div>
                            <div className={style.icondiv}>
                                <a onClick={() => navigate('/chat', { state: chat })}>
                                    <img src={chatIcon} title="Chat" />
                                </a>
                                <a onClick={() => navigate('/result', {
                                    state: { name: chat.name, data: chat.summary },
                                })}>
                                    <img src={summariseIcon} title="Summarise" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Saved;
