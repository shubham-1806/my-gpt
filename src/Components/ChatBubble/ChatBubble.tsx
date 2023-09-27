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

const botMessageList = ['Lorem', "The text discusses the importance of palliative care, which is an approach that improves the quality of life of patients and their families facing the problems associated with life-threatening illness. Palliative care seeks to ensure continued life, regardless of the severity of the illness. It provides holistic care for physical, psychosocial, and spiritual discomfort." +
"" +
"The history of palliative care began with hospice, which was first provided by religious groups but has gradually become an important part of the healthcare system. Hospices were started in England in 1967 by a woman named Cicely Saunders, who is considered the founder of the hospice movement. The first hospices, St. Joseph's and St. Christophers Hospice, were started in England in 1967." +
"" +
"Palliative care grew from the hospice setting as it was realized that patients and their families displayed a need for a more holistic treatment plan. Throughout the short time since its beginning, palliative and end-of-life care have made great progress in obtaining support from the government and the public in the effort to provide better care for those with terminal illnesses." +
"" +
"Social workers are trained to be action-oriented in achieving change in society to assist vulnerable populations. They are able to witness firsthand the areas of strength and weakness within the caring system. Social workers are also able to create discussion in society that will have the possibility to lead to policy/law creation and change." +
"" +
"The World Health Organization published The Solid Facts about palliative care, which mentions multiple areas of need, such as cultural sensitivity, reaching economically-challenged individuals and families who may not know palliative care services are available to them, or do not know how to go about obtaining them. Currently, Medicare and most insurance companies cover palliative care costs." +
"" +
"Social workers have an ethical obligation to obtain such training and knowledge if they are going to work in such a setting, and they could help and encourage others in the healthcare world to obtain such training. Social workers hold a unique and important position within this growing, specialized field.", 'dolor,',"Palliative care is a specialized approach to healthcare focused on improving the quality of life for individuals dealing with serious, life-threatening illnesses. It aims to provide comprehensive support, including pain and symptom management, emotional and psychosocial assistance, and open communication. Palliative care can be integrated at any stage of a serious illness and is delivered by a team of healthcare professionals. Unlike hospice care, it can coexist with curative treatments and is designed to enhance the patient's comfort, well-being, and overall quality of life.", 'amet',"The historical connection between hospice care and palliative care lies in the origins of palliative care. Hospice care, initially provided by religious groups, laid the foundation for palliative care. Cicely Saunders, known as the founder of the hospice movement, established the first hospices in England in 1967. Palliative care emerged from the hospice setting as it became evident that patients and families needed a more comprehensive approach to address the physical, emotional, and spiritual aspects of life-threatening illnesses. This historical connection underscores the evolution of palliative care and its holistic approach to improving the quality of life for patients and their families.", 'adipisicing', 'elit.', 'Alias', 'sunt', 'dignissimos', 'libero', 'deserunt', 'in.', 'Labore', 'dolores', 'est', 'totam', 'qui', 'ipsam', 'id', 'quia', 'iste', 'nostrum,', 'deleniti,', 'quos', 'corrupti', 'dolor', 'expedita', 'quisquam', 'dolore!', 'Dolore', 'sapiente', 'provident', 'sint', 'quidem', 'vel', 'cum,', 'magni', 'aliquam', 'laboriosam', 'dignissimos', 'accusamus', 'quasi', 'impedit', 'ut', 'adipisci', 'pariatur', 'odio', 'at', 'rem', 'dicta,', 'fuga,', 'corporis', 'quisquam.', 'Distinctio', 'cumque', 'aliquam', 'dignissimos', 'vitae', 'nesciunt', 'voluptatibus', 'quis', 'eum', 'repellat!', 'Magni', 'cum', 'accusamus', 'ea', 'tempore!', 'Optio', 'quas', 'blanditiis', 'necessitatibus', 'dignissimos', 'pariatur', 'voluptatibus', 'velit', 'voluptate', 'culpa', 'accusantium', 'nam', 'dolore', 'voluptates', 'inventore', 'laudantium,', 'tempore', 'neque', 'nesciunt', 'itaque', 'cum', 'nobis', 'cumque', 'a', 'temporibus', 'facere', 'animi?', 'Sed,', 'autem', 'veritatis.']



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
                                    options={{
                                        delay: 100/message.length,
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter
                                            .stop()
                                            .typeString(message.length > 10 && botMessageList[Number(id)].length < 10 ? message : botMessageList[Number(id)])
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

