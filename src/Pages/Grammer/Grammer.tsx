import { useState, useEffect } from 'react';
import { Add, Delete, Header, Loader, Swap } from '../../Components';
import style from './Grammer.module.css';
import style_Common from '../../Components/GrammerButtons/common.module.css';
import { diffWords } from 'diff';
import back from '../../assets/back.svg';
import copy from '../../assets/copy.svg';
import { pageToWindowEvents, windowToPageEvents } from '../../Config/eventConfig';
import toast from 'react-hot-toast';
import { ModelCommunicationResponse } from '../../Config/types';

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
                if (arg.status === 'error') {
                    toast.error(arg.content, {
                        duration: 5000,
                    });
                    return;
                }
                startReview(text, arg.content);
            },
        );
        return () => {
            window.ipcRenderer.removeAllListeners(windowToPageEvents.GrammarCheckEvent);
        };
    });

    const [mode, setMode] = useState<'upload' | 'review'>('upload');
    const [activeId, setActiveId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setResult] = useState<string>("");
    const [resultArray, setResultArray] = useState<spanTag[]>([]);
    const [changesArray, setChangesArray] = useState<changesTag>({});

    const updateChangesArray = (spanObj: spanTag) => {
        const key = spanObj.id.split('.')[0];
        setChangesArray(prevChangesArray => {
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
        setChangesArray(prevChangesArray => {
            const updatedChangesArray = { ...prevChangesArray };

            updatedChangesArray[position][0].resolved = true;

            return updatedChangesArray;
        });
    };

    const deleteSpan = (position: string, id: string) => {
        const toBeDeleted = document.getElementById(id);
        if (toBeDeleted) toBeDeleted.remove();
        setResolved(position);
    };

    const addSpan = (position: string, id: string) => {
        const toBeAdded = document.getElementById(id);
        if (toBeAdded) toBeAdded.className = style.normalSpan;
        setResolved(position);
    };

    const onClickHandler = (id: string) => {
        const list = document.getElementsByClassName('back');
        for (let i = 0; i < list.length; i++) {
            (list[i] as HTMLElement).classList.remove(style_Common.activeBox);
        }

        const element = document.querySelector(`[data-val="${id}"]`);
        setActiveId(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
            element.classList.add(style_Common.activeBox);
        }
    };

    const sendReviewRequest = async () => {
        setLoading(true);
        // startReview(text, "'Did you know that bats are mammals? We know this because they are mammals just like us because they are warm-blooded, and they are the only mammals that know how to fly. Bats are nocturnal, which means they sleep during the day and are awake at night.");
        window.ipcRenderer.send(pageToWindowEvents.GrammarCheckEvent, text);
    };

    const startReview = (textInput: string, gptResponse: string) => {
        setLoading(false);
        setMode('review');
        setResult(gptResponse);
        const diff = diffWords(textInput, gptResponse);
        let skip = false;
        for (let index = 0; index < diff.length; index++) {
            const element = diff[index];
            let span_obj: spanTag;
            if (skip) {
                span_obj = {
                    resolved: false,
                    text: element.value,
                    color: mapper['added'],
                    id: (index - 1).toString() + '.added',
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
                        color: mapper['removed'],
                        id: index.toString() + '.removed',
                    };
                    skip = true;
                } else {
                    span_obj = {
                        resolved: false,
                        text: element.value,
                        color: mapper['removed'],
                        id: index.toString() + '.removed',
                    };
                }
            } else if (element.added && element.added === true) {
                span_obj = {
                    resolved: false,
                    text: element.value,
                    color: mapper['added'],
                    id: index.toString() + '.added',
                };
            } else {
                span_obj = {
                    resolved: false,
                    text: element.value,
                    color: mapper['normal'],
                    id: index.toString() + '.normal',
                };
            }
            setResultArray(oldArray => [...oldArray, span_obj]);
            updateChangesArray(span_obj);
        }
    };

    useEffect(() => {
        document.querySelectorAll('[data-id]').forEach(item => {
            (item as HTMLElement).classList.remove((item as HTMLElement).dataset.type ?? 'none');
        });

        document.querySelectorAll(`[data-id="${activeId}"]`).forEach(item => {
            (item as HTMLElement).classList.add((item as HTMLElement).dataset.type ?? '');
        });
    }, [activeId]);

    const copyText = () => {
        const resultElement = document.getElementById('resultText');
        let newText = '';
        if (resultElement) {
            for (let i = 0; i < resultElement.childNodes.length; i++) {
                const element = resultElement.childNodes[i] as HTMLElement;
                newText = newText + element.innerHTML;
                if (element.dataset.type === style.deleteSpanHighlight) {
                    if (
                        i + 1 < resultElement.childNodes.length &&
                        (resultElement.childNodes[i + 1] as HTMLElement).dataset.type ===
                            style.addSpanHighlight
                    ) {
                        i = i + 1;
                    }
                }
            }
        }
        return newText;
    };

    const clippyCopy = () => {
        navigator.clipboard.writeText(copyText());
        toast.success('Copied to Clipboard!', {
            duration: 5000,
        });
    };

    const reCheck = () => {
        const newText = copyText();
        setMode('upload');
        setResult('');
        setText(newText);
        (document.getElementById('resultText') as HTMLElement).textContent = '';
        // setResultArray([]);
        setChangesArray({});
        setLoading(true);
        // startReview(newText, "'Did you know that bats are mammals? We know this because they are mammals just like us because they are warm-blooded, and they are the only mammals that know how to fly. Bats are nocturnal, which means they sleep during the day and are awake at night.");
        window.ipcRenderer.send(pageToWindowEvents.GrammarCheckEvent, newText);
    };

    return (
        <div className={style.mainContainer}>
            <Header />
            {mode === 'upload' ? (
                <div className={style.uploadWrapper}>
                    {loading ? <Loader /> : null}
                    <h1 className={style.dropTitle}>Grammar Checker</h1>
                    <p className={style.subtext}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
                        assumenda maxime aliquam, soluta ipsam est quod minus eligendi. Voluptas
                        aperiam quasi facilis, neque labore temporibus ad illo dicta nostrum sunt
                        ratione incidunt.
                    </p>
                    <textarea
                        placeholder="Enter your text here"
                        value={text}
                        spellCheck={false}
                        onChange={e => {
                            setText(e.target.value);
                        }}
                    />
                    <button className={style.try} onClick={() => sendReviewRequest()}>
                        Fix It Up !
                    </button>
                </div>
            ) : (
                <div className={style.reviewWrapper}>
                    <div className={style.resultWrapper}>
                        <div className={style.goback}>
                            <div
                                onClick={() => {
                                    setMode('upload');
                                    setResult('');
                                    setText('');
                                    setResultArray([]);
                                    setChangesArray({});
                                }}
                            >
                                <img src={back} /> Back
                            </div>
                            <div
                                className={style.try}
                                style={{ marginTop: '0' }}
                                onClick={() => reCheck()}
                            >
                                Re-Check !
                            </div>
                            <div
                                onClick={() => {
                                    clippyCopy();
                                }}
                            >
                                <img src={copy} />
                            </div>
                        </div>

                        <div id="resultText" className={style.resultText} spellCheck="false">
                            {resultArray.map((item, index) => {
                                return (
                                    <span
                                        data-id={item.id.split('.')[0]}
                                        data-type={
                                            item.color === style.addSpan
                                                ? style.addSpanHighlight
                                                : item.color === style.deleteSpan
                                                    ? style.deleteSpanHighlight
                                                    : 'none'
                                        }
                                        data-content={
                                            item.id.split('.')[0] +
                                            (item.color === style.deleteSpan).toString()
                                        }
                                        key={index}
                                        className={item.color}
                                        id={item.id}
                                        contentEditable={item.color === style.deleteSpan}
                                        style={{
                                            cursor:
                                                item.color !== style.normalSpan ? 'pointer' : '',
                                        }}
                                        onClick={() => {
                                            if (item.color !== style.normalSpan)
                                                onClickHandler(item.id.split('.')[0]);
                                        }}
                                        onKeyDown={() => {
                                            if (item.color === style.deleteSpan) {
                                                const element = document.querySelector(
                                                    `[data-content="${
                                                        item.id.split('.')[0] +
                                                        (item.color === style.deleteSpan).toString()
                                                    }"]`,
                                                );
                                                if (element) {
                                                    if (element.textContent?.length === 1) {
                                                        deleteSpan(item.id.split('.')[0], item.id);
                                                        deleteSpan(
                                                            item.id.split('.')[0],
                                                            item.id.split('.')[0] + '.added',
                                                        );
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        {item.text}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div id="display" className={style.changeWrapper}>
                        {Object.keys(changesArray).map(item => {
                            if (changesArray[item][0].resolved === true) return null;
                            const arrLen = changesArray[item].length;
                            if (arrLen === 2) {
                                return (
                                    <Swap
                                        key={item}
                                        changesArray={changesArray}
                                        addSpan={addSpan}
                                        deleteSpan={deleteSpan}
                                        item={item}
                                        active={activeId === item}
                                        setActiveId={setActiveId}
                                    />
                                );
                            } else {
                                const changeType = changesArray[item][0].id.split('.')[1];
                                if (changeType === 'added')
                                    return (
                                        <Add
                                            key={item}
                                            changesArray={changesArray}
                                            addSpan={addSpan}
                                            deleteSpan={deleteSpan}
                                            item={item}
                                            active={activeId === item}
                                            setActiveId={setActiveId}
                                        />
                                    );
                                else if (changeType === 'removed')
                                    return (
                                        <Delete
                                            key={item}
                                            changesArray={changesArray}
                                            addSpan={addSpan}
                                            deleteSpan={deleteSpan}
                                            item={item}
                                            active={activeId === item}
                                            setActiveId={setActiveId}
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
