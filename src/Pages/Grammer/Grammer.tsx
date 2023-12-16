import { useState, useEffect } from "react";
import { Add, Delete, Header, Loader, Swap } from "../../Components";
import style from "./Grammer.module.css";
import { diffWords } from "diff";
import back from "../../assets/back.svg";
import {
    pageToWindowEvents,
    windowToPageEvents,
} from "../../Config/eventConfig";
import toast from "react-hot-toast";
import { ModelCommunicationResponse } from "../../Config/types"

const mapper = {
    added: style.addSpan,
    removed: style.deleteSpan,
    normal: style.normalSpan,
};

const Grammer = () => {
    useEffect(() => {
        window.ipcRenderer.on(
            windowToPageEvents.GrammarCheckEvent,
            (_event, arg: ModelCommunicationResponse) => {
                if (arg.status === "error") {
                    toast.error(arg.content,{
                        duration: 5000
                    });
                    return;
                }
                startReview(arg.content);
            }
        );
        return () => {
            window.ipcRenderer.removeAllListeners(
                windowToPageEvents.GrammarCheckEvent
            );
        };
    });

    const [mode, setMode] = useState<"upload" | "review">("upload");
    const [loading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [resultArray, setResultArray] = useState<spanTag[]>([]);
    const [changesArray, setChangesArray] = useState<changesTag>({});

    const updateChangesArray = (spanObj: spanTag) => {
        const key = spanObj.id.split(".")[0];
        setChangesArray((prevChangesArray) => {
            const updatedChangesArray = { ...prevChangesArray };
            if (updatedChangesArray[key] !== undefined) {
                updatedChangesArray[key].push(spanObj);
            } else {
                updatedChangesArray[key] = [spanObj];
            }
            return updatedChangesArray;
        });
    };

    const setResolved = (position: string) => {
        setChangesArray((prevChangesArray) => {
            const updatedChangesArray = { ...prevChangesArray };

            updatedChangesArray[position][0].resolved = true;

            return updatedChangesArray;
        });
    };

    const deleteSpan = (position: string, id: string) => {
        const toBeDeleted = document.getElementById(id);
        if (toBeDeleted) toBeDeleted.style.display = "none";
        setResolved(position);
    };

    const addSpan = (position: string, id: string) => {
        const toBeAdded = document.getElementById(id);
        if (toBeAdded) toBeAdded.className = style.normalSpan;
        setResolved(position);
    };

    const onClickHandler = (id: string) => {
        const list = document.getElementsByClassName("back");
        for (let i = 0; i < list.length; i++) {
            (list[i] as HTMLElement).style.scale = "1";
        }

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
            element.style.scale = "1.05";
        }
    };

    const sendReviewRequest = async () => {
        setLoading(true);
        window.ipcRenderer.send(pageToWindowEvents.GrammarCheckEvent, text);
    };

    const startReview = (gptResponse: string) => {
        setLoading(false);
        setMode("review");
        setResult(gptResponse);
        const diff = diffWords(text, result);
        let skip = false;
        for (let index = 0; index < diff.length; index++) {
            const element = diff[index];
            let span_obj: spanTag;
            if (skip) {
                span_obj = {
                    resolved: false,
                    text: element.value,
                    color: mapper["added"],
                    id: (index - 1).toString() + ".added",
                };
                skip = false;
            } else if (element.removed && element.removed === true) {
                if (
                    index + 1 < diff.length &&
                    diff[index + 1].added &&
                    diff[index + 1].added === true
                ) {
                    span_obj = {
                        resolved: false,
                        text: element.value,
                        color: mapper["removed"],
                        id: index.toString() + ".removed",
                    };
                    skip = true;
                } else {
                    span_obj = {
                        resolved: false,
                        text: element.value,
                        color: mapper["removed"],
                        id: index.toString() + ".removed",
                    };
                }
            } else if (element.added && element.added === true) {
                span_obj = {
                    resolved: false,
                    text: element.value,
                    color: mapper["added"],
                    id: index.toString() + ".added",
                };
            } else {
                span_obj = {
                    resolved: false,
                    text: element.value,
                    color: mapper["normal"],
                    id: index.toString() + ".normal",
                };
            }
            setResultArray((oldArray) => [...oldArray, span_obj]);
            updateChangesArray(span_obj);
        }
    };

    return (
        <div className={style.mainContainer}>
            <Header />
            {mode === "upload" ? (
                <div className={style.uploadWrapper}>
                    {loading ? <Loader /> : null}
                    <h1 className={style.dropTitle}>Grammer Checker</h1>
                    <p className={style.subtext}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laudantium assumenda maxime aliquam, soluta ipsam est
                        quod minus eligendi. Voluptas aperiam quasi facilis,
                        neque labore temporibus ad illo dicta nostrum sunt
                        ratione incidunt.
                    </p>
                    <textarea
                        placeholder="Enter your text here"
                        value={text}
                        spellCheck={false}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    <button
                        className={style.try}
                        onClick={() => sendReviewRequest()}
                    >
                        Fix It Up !
                    </button>
                </div>
            ) : (
                <div className={style.reviewWrapper}>
                    <div className={style.resultWrapper}>
                        <div
                            className={style.goback}
                            onClick={() => {
                                setMode("upload");
                            }}
                        >
                            <img src={back} /> Back
                        </div>
                        <div className={style.resultText}>
                            {resultArray.map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={item.color}
                                        id={item.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            onClickHandler(
                                                "button" + item.id.split(".")[0]
                                            );
                                        }}
                                    >
                                        {item.text}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div id="display" className={style.changeWrapper}>
                        {Object.keys(changesArray).map((item) => {
                            if (changesArray[item][0].resolved === true)
                                return null;
                            const arrLen = changesArray[item].length;
                            if (arrLen === 2) {
                                return (
                                    <Swap
                                        changesArray={changesArray}
                                        addSpan={addSpan}
                                        deleteSpan={deleteSpan}
                                        item={item}
                                    />
                                );
                            } else {
                                const changeType =
                                    changesArray[item][0].id.split(".")[1];
                                if (changeType === "added")
                                    return (
                                        <Add
                                            changesArray={changesArray}
                                            addSpan={addSpan}
                                            deleteSpan={deleteSpan}
                                            item={item}
                                        />
                                    );
                                else if (changeType === "removed")
                                    return (
                                        <Delete
                                            changesArray={changesArray}
                                            addSpan={addSpan}
                                            deleteSpan={deleteSpan}
                                            item={item}
                                        />
                                    );
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Grammer;
