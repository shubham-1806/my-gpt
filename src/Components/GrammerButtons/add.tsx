import { useEffect, useState } from 'react';
import style from './common.module.css';

interface Props {
    changesArray: changesTag;
    item: string;
    addSpan: (position: string, id: string) => void;
    deleteSpan: (position: string, id: string) => void;
    active: boolean;
    setActiveId: React.Dispatch<React.SetStateAction<string>>;
    acceptAll: boolean;
}
const Add = ({ changesArray, item, addSpan, deleteSpan, active, setActiveId, acceptAll }: Props) => {
    const [toggle, setToggle] = useState<boolean>(false);

    const onClickHandler = () => {
        setActiveId(item);
        const list = document.getElementsByClassName('back');
        for (let i = 0; i < list.length; i++) {
            (list[i] as HTMLElement).classList.remove(style.activeBox);
        }

        const ded = document.querySelector(`[data-val="${item}"]`);
        ded?.classList.add(style.activeBox);

        document.querySelector(`[data-id="${item}"]`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    };

    useEffect(() => {
        setToggle(active);
    }, [active]);

    useEffect(() => {
        if(acceptAll)
            addSpan(item, changesArray[item][0].id)
    }, [acceptAll]);

    return (
        <div
            id={'button' + changesArray[item][0].id.split('.')[0]}
            data-val={changesArray[item][0].id.split('.')[0]}
            className={style.add + ' back'}
            key={item}
            style={{ cursor: toggle ? 'default' : 'pointer' }}
            onClick={() => {
                onClickHandler();
            }}
        >
            <span>{changesArray[item][0].text}</span>
            {toggle ? (
                <div className={style.buttonWrapper}>
                    <div
                        data-accept="accept"
                        onClick={() => addSpan(item, changesArray[item][0].id)}
                        className={style.accept}
                    >
                        accept
                    </div>
                    <div
                        onClick={() => deleteSpan(item, changesArray[item][0].id)}
                        className={style.reject}
                    >
                        Dismiss
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Add;
