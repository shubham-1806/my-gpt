import { useEffect, useState } from 'react';
import { Header, Loader } from '../../Components';
import style from './Saved.module.css';
import { useNavigate } from 'react-router-dom';
import chatIcon from '../../assets/chat.svg';
import summariseIcon from '../../assets/summarise.svg';
import { pageToWindowEvents, windowToPageEvents } from '../../Config/eventConfig';
import { ModelCommunicationResponse } from '../../Config/types';
import toast from 'react-hot-toast';

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
    filepath: string;
}

const Saved = () => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setChats(localStorage.getItem('file_arrays') ? JSON.parse(localStorage.getItem('file_arrays')!) : []);
        window.ipcRenderer.addListener(
            windowToPageEvents.SummariseEvent,
            (_event, message: ModelCommunicationResponse) => {
                setLoading(false);
                if (message.status === 'success') {
                    navigate('/result', {
                        state: { name: 'Summary', data: message.content },
                    });
                } else {
                    toast.error(message.content, {
                        duration: 5000,
                    });
                }
            },
        );
    }, []);

    const Summarise = (filepath: string)=>{
        setLoading(true);
        window.ipcRenderer.send(pageToWindowEvents.SummariseEvent, filepath );
    }

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
                                <a onClick={() => Summarise(chat.filepath)}>
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
