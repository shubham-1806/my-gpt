import Typewriter from "typewriter-effect";
import style from "./ChatBubble.module.css";
import upload2 from "../../assets/upload2.svg";
import { Loader } from "..";

interface ChatBubbleProps {
  agent: "user" | "bot";
  message: string;
  isUpload: boolean;
  loading: boolean;
  id: string;
  currentId: string;
}

const botMessageList = ['Lorem', 'ipsum', 'dolor,', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit.', 'Alias', 'sunt', 'dignissimos', 'libero', 'deserunt', 'in.', 'Labore', 'dolores', 'est', 'totam', 'qui', 'ipsam', 'id', 'quia', 'iste', 'nostrum,', 'deleniti,', 'quos', 'corrupti', 'dolor', 'expedita', 'quisquam', 'dolore!', 'Dolore', 'sapiente', 'provident', 'sint', 'quidem', 'vel', 'cum,', 'magni', 'aliquam', 'laboriosam', 'dignissimos', 'accusamus', 'quasi', 'impedit', 'ut', 'adipisci', 'pariatur', 'odio', 'at', 'rem', 'dicta,', 'fuga,', 'corporis', 'quisquam.', 'Distinctio', 'cumque', 'aliquam', 'dignissimos', 'vitae', 'nesciunt', 'voluptatibus', 'quis', 'eum', 'repellat!', 'Magni', 'cum', 'accusamus', 'ea', 'tempore!', 'Optio', 'quas', 'blanditiis', 'necessitatibus', 'dignissimos', 'pariatur', 'voluptatibus', 'velit', 'voluptate', 'culpa', 'accusantium', 'nam', 'dolore', 'voluptates', 'inventore', 'laudantium,', 'tempore', 'neque', 'nesciunt', 'itaque', 'cum', 'nobis', 'cumque', 'a', 'temporibus', 'facere', 'animi?', 'Sed,', 'autem', 'veritatis.']


const ChatBubble = ({ agent, message, isUpload, loading, id, currentId }: ChatBubbleProps) => {
        
    return (
        <>
            <div
                className={style.bubbleWrapper}
                style={{
                    justifyContent: `${agent === "user" ? "flex-end" : "flex-start"}`,
                }}
            >
                <div
                    className={style.bubble}
                    style={{
                        backgroundColor: `${
                            agent === "user" ? " var(--text-box)" : "var(--box-off-white2)"
                        }`,
                        borderRadius: `${
                            agent === "user" ? " 50px 0px 50px 50px" : "0px 50px 50px 50px"
                        }`,
                        transformOrigin: `${agent === "user" ? "top right" : "top left"}`,
                    }}
                >
                    <img
                        src={upload2}
                        style={{
                            display: isUpload ? "inline-block" : "none",
                            scale: "0.8",
                            margin: "0px 5px -5px",
                        }}
                    />
                    {agent === "user" ? (
                        message
                    ) : (
                        <>
                            {loading}
                            {currentId !== id ? botMessageList[Number(id)] :
                                loading ? <Loader rounded={true} /> : <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .stop()
                                            .typeString(botMessageList[Number(id)])
                                            .start()
                                    }}
                                />
                            }
                        </>
                    )}
                </div>
            </div>
            <div className="spacerToView"></div>
        </>
    );
};

export default ChatBubble;

