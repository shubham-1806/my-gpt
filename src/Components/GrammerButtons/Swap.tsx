import { useState } from "react";
import style from "./common.module.css";

interface Props {
  changesArray: changesTag;
  item: string;
  addSpan: (position: string, id: string) => void;
  deleteSpan: (position: string, id: string) => void;
}
const Swap = ({ changesArray, item, addSpan, deleteSpan }: Props) => {
    const [toggle, setToggle] = useState<boolean>(false);

    const onClickHandler = () => {
        document
            .getElementById(changesArray[item][0].id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });

        setToggle((prev) => !prev);
    };

    return (
        <div
            id={"button"+changesArray[item][0].id.split(".")[0]}
            className={style.chain}
            key={item}
            style={{ cursor: toggle ? "default" : "pointer" }}
            onClick={() => {
                onClickHandler();
            }}
        >
            <s>{changesArray[item][0].text}</s>
            <span style={{ marginInline: "1rem" }}>
                {changesArray[item][1].text}
            </span>
            {toggle ?
                <div className={style.buttonWrapper}>
                    <div
                        onClick={() => {
                            deleteSpan(item, changesArray[item][0].id);
                            addSpan(item, changesArray[item][1].id);
                        }}
                        className={style.accept}
                    >
          accept
                    </div>
                    <div
                        onClick={() => {
                            addSpan(item, changesArray[item][0].id);
                            deleteSpan(item, changesArray[item][1].id);
                        }}
                        className={style.reject}
                    >
          Dismiss
                    </div>
                </div> : null}
        </div>
    );
};

export default Swap;
