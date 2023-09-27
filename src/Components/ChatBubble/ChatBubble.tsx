import style from "./ChatBubble.module.css";
import upload2 from "../../assets/upload2.svg";

interface ChatBubbleProps {
  type: "user" | "bot";
  message: string;
  isUpload: boolean;
}


const ChatBubble = ({ type, message, isUpload }: ChatBubbleProps) => {
    return (
        <>
            <div
                className={style.bubbleWrapper}
                style={{
                    justifyContent: `${type === "user" ? "flex-end" : "flex-start"}`,
                }}
            >
                <div
                    className={style.bubble}
                    style={{
                        backgroundColor: `${
                            type === "user" ? " var(--text-box)" : "var(--box-off-white2)"
                        }`,
                        borderRadius: `${
                            type === "user" ? " 50px 0px 50px 50px" : "0px 50px 50px 50px"
                        }`,
                        transformOrigin: `${
                            type === "user" ? "top right" : "top left"
                        }`,
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
                    {message}
                </div>
            </div>
            <div className="spacerToView"></div>
        </>
    );
};

export default ChatBubble;
