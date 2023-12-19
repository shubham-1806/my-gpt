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
    link: string;
    chatLists: ChatBubbleProps[];
}

const Saved = () => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setChats([
            {
                name: 'Criticalll Packet Prioritisation by Slack-Aware Re-routing in On-Chip Networks',
                link: '/chat',
                chatLists: [
                    { agent: 'user', message: 'hey', isUpload: false, id: '0' },
                    { agent: 'bot', message: 'heyyyy', isUpload: false, id: '1' },
                ],
            },
            {
                name: 'Exploring the Impact of Artificial Intelligence on Healthcare',
                link: '/chat',
                chatLists: [{ agent: 'user', message: 'hey', isUpload: false, id: '0' }],
            },
            {
                name: 'Critical Packet Prioritisation by Slack-Aware Re-routing in On-Chip Networks',
                link: '/chat',
                chatLists: [{ agent: 'user', message: 'hey', isUpload: false, id: '0' }],
            },
            {
                name: 'Pallative care',
                link: '/chat',
                chatLists: [
                    { agent: 'user', message: 'what was the summary?', isUpload: true, id: '0' },
                    {
                        agent: 'bot',
                        message:
                            'The text discusses the importance of palliative care, which is an approach that improves the quality of life of patients and their families facing the problems associated with life-threatening illness. Palliative care seeks to ensure continued life, regardless of the severity of the illness. It provides holistic care for physical, psychosocial, and spiritual discomfort.' +
                            '' +
                            "The history of palliative care began with hospice, which was first provided by religious groups but has gradually become an important part of the healthcare system. Hospices were started in England in 1967 by a woman named Cicely Saunders, who is considered the founder of the hospice movement. The first hospices, St. Joseph's and St. Christophers Hospice, were started in England in 1967." +
                            '' +
                            'Palliative care grew from the hospice setting as it was realized that patients and their families displayed a need for a more holistic treatment plan. Throughout the short time since its beginning, palliative and end-of-life care have made great progress in obtaining support from the government and the public in the effort to provide better care for those with terminal illnesses.' +
                            '' +
                            'Social workers are trained to be action-oriented in achieving change in society to assist vulnerable populations. They are able to witness firsthand the areas of strength and weakness within the caring system. Social workers are also able to create discussion in society that will have the possibility to lead to policy/law creation and change.' +
                            '' +
                            'The World Health Organization published The Solid Facts about palliative care, which mentions multiple areas of need, such as cultural sensitivity, reaching economically-challenged individuals and families who may not know palliative care services are available to them, or do not know how to go about obtaining them. Currently, Medicare and most insurance companies cover palliative care costs.' +
                            '' +
                            'Social workers have an ethical obligation to obtain such training and knowledge if they are going to work in such a setting, and they could help and encourage others in the healthcare world to obtain such training. Social workers hold a unique and important position within this growing, specialized field.',
                        isUpload: false,
                        id: '1',
                    },
                ],
            },
        ]);
        setLoading(false);
    }, []);

    const runSummary = (id: number) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/result', {
                state: { name: 'Summary', data: id.toString() },
            });
        }, 1000);
    };

    return (
        <div className={style.mainContainer}>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <div className={style.savedWrapper}>
                    {chats.map((chat, index) => (
                        <div key={index} className={style.savedBox}>
                            <div>{chat.name}</div>
                            <div className={style.icondiv}>
                                <a onClick={() => navigate('/chat', { state: 'Lorem Impsum.pdf' })}>
                                    <img src={chatIcon} title="Chat" />
                                </a>
                                <a onClick={() => runSummary(69)}>
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
