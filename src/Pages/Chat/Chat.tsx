import { ChatBubble, Header } from '../../Components';
import style from './Chat.module.css';
import upload from '../../assets/upload.svg';
import enter from '../../assets/enter.svg';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { windowToPageEvents, pageToWindowEvents } from '../../Config/eventConfig';
import { ModelCommunicationResponse } from '../../Config/types';
import toast from 'react-hot-toast';

export interface ChatHistory {
    query: string;
    chat_history: string[];
}

interface ChatBubbleProps {
    agent: 'user' | 'bot';
    message: string;
    isUpload: boolean;
    id: string;
}

const Chat = () => {
    const [chatMessages, setChatMessages] = useState<ChatBubbleProps[]>([]);
    const [id, setId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [botTurn, setBotTurn] = useState<boolean>(false);
    const messageRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        if (state) {
            console.log(state);
            setChatMessages(state);
            setId(state.length);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addUserChatBubble = (message: string) => {
        const chatHistory = chatMessages.map(chatMessage => chatMessage.message);
        setChatMessages([
            ...chatMessages,
            {
                agent: 'user',
                message: message,
                isUpload: false,
                id: id.toString(),
            },
        ]);
        console.log(chatHistory);
        const messageToSend: ChatHistory = {
            query: message,
            chat_history: chatHistory,
        };
        window.ipcRenderer.send(pageToWindowEvents.ChatEvent, messageToSend);
        messageRef.current!.value = '';
        setId(id + 1);
        setBotTurn(true);
        setLoading(true);
    };

    const addUserChatBubbleOnFileUpload = (filePath: string, fileName: string) => {
        setChatMessages([
            ...chatMessages,
            {
                agent: 'user',
                message: 'Uploaded the Document ' + fileName,
                isUpload: true,
                id: id.toString(),
            },
        ]);
        setId(id + 1);
        setBotTurn(true);
        setLoading(true);
        window.ipcRenderer.send(pageToWindowEvents.UploadChatDocument, filePath);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFile = (e: any) => {
        const filePath = e.target.files[0].path;
        const splitPath = e.target.files[0].path.split('/');
        const splitName = splitPath[splitPath.length - 1];
        addUserChatBubbleOnFileUpload(filePath, splitName);
    };

    useEffect(() => {
        window.ipcRenderer.addListener(
            windowToPageEvents.ChatEvent,
            (_event, message: ModelCommunicationResponse) => {
                setLoading(false);
                setBotTurn(false);
                console.log(message);
                console.log(chatMessages);
                if (message.status === 'success') {
                    setChatMessages([
                        ...chatMessages,
                        {
                            agent: 'bot',
                            message: message.content,
                            isUpload: false,
                            id: id.toString(),
                        },
                    ]);
                    setId(id + 1);
                } else {
                    toast.error(message.content);
                }
            },
        );
        return () => {
            window.ipcRenderer.removeAllListeners(windowToPageEvents.ChatEvent);
        };
    },[chatMessages,id]);

    useEffect(() => {
        const scrollArray = document.getElementsByClassName('spacerToView');
        const scrollElement = scrollArray[scrollArray.length - 1];
        scrollElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    }, [id]);

    return (
        <div className={style.mainContainer}>
            <Header />
            <div className={style.chatWrapper}>
                <div className={style.chatPart}>
                    {id === 0 ? (
                        <div className={style.wrapper}>
                            <div className={style.savedBox}>
                                Effortlessly condense PDFs or web content into concise summaries.
                            </div>
                            <div className={style.savedBox}>
                                Interactively inquire about key points from your summaries.
                            </div>
                            <div className={style.savedBox}>
                                Access summaries offline, anytime, anywhere.
                            </div>
                            <div className={style.savedBox}>
                                Save and revisit your valuable summaries with ease.
                            </div>
                        </div>
                    ) : (
                        <>
                            {chatMessages.map(chatMessage => (
                                <ChatBubble
                                    agent={chatMessage.agent}
                                    message={chatMessage.message}
                                    isUpload={chatMessage.isUpload}
                                    key={chatMessage.id.toString()}
                                    loading={loading}
                                    id={chatMessage.id}
                                    currentId={(id - 1).toString()}
                                />
                            ))}
                            {loading && (
                                <ChatBubble
                                    agent={'bot'}
                                    message={'erwerwr'}
                                    isUpload={false}
                                    key={(2048).toString()}
                                    loading={true}
                                    id={(2048).toString()}
                                    currentId={(2048).toString()}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className={style.chatPrompt}>
                    <input
                        type="file"
                        id="file"
                        hidden
                        ref={inputRef}
                        onChange={e => uploadFile(e)}
                    />
                    <div className={style.uploadButton} onClick={() => inputRef.current?.click()}>
                        <img style={{ scale: '0.7' }} src={upload} />
                    </div>
                    <div className={style.input}>
                        <input
                            type="text"
                            placeholder="Type to add a message..."
                            ref={messageRef}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.key === 'Enter') {
                                    addUserChatBubble(messageRef.current?.value || '');
                                }
                            }}
                            disabled={botTurn}
                        />
                        <img
                            style={{ scale: '0.7', cursor: 'pointer' }}
                            src={enter}
                            onClick={() => {
                                addUserChatBubble(messageRef.current?.value || '');
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
