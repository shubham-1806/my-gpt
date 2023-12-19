import Typewriter from 'typewriter-effect';
import style from './ChatBubble.module.css';
import upload2 from '../../assets/upload2.svg';
import { Loader } from '..';

interface ChatBubbleProps {
    agent: 'user' | 'bot';
    message: string;
    isUpload: boolean;
    loading: boolean;
    id: string;
    currentId: string;
}

const ChatBubble = ({ agent, message, isUpload, loading, id, currentId }: ChatBubbleProps) => {
    return (
        <>
            <div
                className={style.bubbleWrapper}
                style={{
                    justifyContent: `${agent === 'user' ? 'flex-end' : 'flex-start'}`,
                }}
            >
                <div
                    className={style.bubble}
                    style={{
                        backgroundColor: `${
                            agent === 'user' ? ' var(--text-box)' : 'var(--box-off-white2)'
                        }`,
                        borderRadius: `${
                            agent === 'user' ? ' 50px 0px 50px 50px' : '0px 50px 50px 50px'
                        }`,
                        transformOrigin: `${agent === 'user' ? 'top right' : 'top left'}`,
                    }}
                >
                    <img
                        src={upload2}
                        style={{
                            display: isUpload ? 'inline-block' : 'none',
                            scale: '0.8',
                            margin: '0px 5px -5px',
                        }}
                    />
                    {agent === 'user' ? (
                        message
                    ) : (
                        <>
                            {loading}
                            {currentId !== id ? (
                                message
                            ) : loading ? (
                                <Loader rounded={true} />
                            ) : (
                                <Typewriter
                                    options={{
                                        delay: 100 / message.length,
                                    }}
                                    onInit={typewriter => {
                                        typewriter
                                            .stop()
                                            .typeString(
                                                message
                                            )
                                            .start();
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="spacerToView"></div>
        </>
    );
};

export default ChatBubble;
