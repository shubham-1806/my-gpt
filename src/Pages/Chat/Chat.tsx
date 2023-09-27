import { Header } from "../../Components";
import style from "./Chat.module.css";
import upload from "../../assets/upload.svg";
import enter from "../../assets/enter.svg";



const Chat = () => {
    

    return (
        <div className={style.mainContainer}>
            <Header />
            <div className={style.chatWrapper}>
                <div className={style.chatPart}>
                    lorem50000000
                </div>
                <div className={style.chatPrompt}>
                    <div className={style.uploadButton}>
                        <img style={{scale: "0.7"}} src={upload} />
                    </div>
                    <div className={style.input}>
                        <input type="text" placeholder="Type to add a message..." />
                        <img style={{scale: "0.7"}} src={enter} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
