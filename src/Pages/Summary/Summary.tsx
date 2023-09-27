import { useEffect, useRef, useState } from "react";
import { Header, Loader } from "../../Components";
import style from "./Summary.module.css";
import x from "../../assets/x.svg";
import { useNavigate } from "react-router-dom";



const Summary = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dropBoxRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputRef = useRef<any>(null);

    const navigate = useNavigate();
    const [fileName, setFileName] = useState<string>("");
    const [filePath, setFilePath] = useState<string>("");
    const [file, setFile] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const summarise = () => {
        setLoading(true);
        window.ipcRenderer.send("gpt-send", filePath);
        setTimeout(() => {
            setLoading(false);
            navigate("/result", { state: { name: 'Pallative care', data: "The text discusses the importance of palliative care, which is an approach that improves the quality of life of patients and their families facing the problems associated with life-threatening illness. Palliative care seeks to ensure continued life, regardless of the severity of the illness. It provides holistic care for physical, psychosocial, and spiritual discomfort.\n\nThe history of palliative care began with hospice, which was first provided by religious groups but has gradually become an important part of the healthcare system. Hospices were started in England in 1967 by a woman named Cicely Saunders, who is considered the founder of the hospice movement. The first hospices, St. Joseph's and St. Christophers Hospice, were started in England in 1967.\n\nPalliative care grew from the hospice setting as it was realized that patients and their families displayed a need for a more holistic treatment plan. Throughout the short time since its beginning, palliative and end-of-life care have made great progress in obtaining support from the government and the public in the effort to provide better care for those with terminal illnesses.\n\nSocial workers are trained to be action-oriented in achieving change in society to assist vulnerable populations. They are able to witness firsthand the areas of strength and weakness within the caring system. Social workers are also able to create discussion in society that will have the possibility to lead to policy/law creation and change.\n\nThe World Health Organization published The Solid Facts about palliative care, which mentions multiple areas of need, such as cultural sensitivity, reaching economically-challenged individuals and families who may not know palliative care services are available to them, or do not know how to go about obtaining them. Currently, Medicare and most insurance companies cover palliative care costs.\n\nSocial workers have an ethical obligation to obtain such training and knowledge if they are going to work in such a setting, and they could help and encourage others in the healthcare world to obtain such training. Social workers hold a unique and important position within this growing, specialized field."} });
        }, 15000);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFile = (e: any) => {
        dropBoxRef.current.style.background = "#EAEAEA";
        setFilePath(e.target.files[0].path);
        const splitPath = e.target.files[0].path.split("/");
        setFileName(splitPath[splitPath.length - 1]);
        setFile(true);
    };

    useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const drop = (event: any) => {
            event.preventDefault();
            event.stopPropagation();

            for (const f of event.dataTransfer.files) {
                setFileName(f.name);
                setFilePath(f.path);
                setFile(true);
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dragover = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const dragenter = () => {
            dropBoxRef.current.style.background = "#EAEAEA";
        };

        const dragleave = () => {
            dropBoxRef.current.style.background = "#EDF0EF";
        };

        const element = dropBoxRef.current;

        element.addEventListener("drop", drop);
        element.addEventListener("dragover", dragover);
        element.addEventListener("dragenter", dragenter);
        element.addEventListener("dragleave", dragleave);
        window.ipcRenderer.addListener("gpt-message", (_event, message) => {
            setLoading(false);
            navigate("/result", { state: { name: 'Summary', data: message } });
        });

        return () => {
            if (element) {
                element.removeEventListener("drop", drop);
                element.removeEventListener("dragover", dragover);
                element.removeEventListener("dragenter", dragenter);
                element.removeEventListener("dragleave", dragleave);
            }
            window.ipcRenderer.removeAllListeners("gpt-message");
        };
    }, [navigate]);

    const reset = () => {
        setFile(false);
        setFileName("");
        setFilePath("");
    };
    return (
        <div className={style.mainContainer}>
            <Header />
            <div className={style.dropWrapper}>
                <h1 className={style.dropTitle}>Summarise a Research Paper or an Article</h1>
                <p className={style.subtext}>
          Summarise any article or research paper, and accelerate your reading and learning with
          our AI technology. Perfect also for research papers, screening articles and reviewing 
          communication.
                </p>
                <div className={style.dropBox}>
                    <div className={style.dropBoxInner} ref={dropBoxRef}>
                        {file ? (
                            <>
                                <img src={x} className={style.cross} onClick={() => reset()} />
                                <h1 className={style.fileName}>{fileName}</h1>
                                <button className={style.try} onClick={() => summarise()}>
                                    {loading ? "Summarising..." : "Summarise the Document?"}
                                </button>
                                {loading ? <Loader /> : null}
                            </>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    id="file"
                                    hidden
                                    ref={inputRef}
                                    onChange={(e) => uploadFile(e)}
                                />
                                <button
                                    className={style.try}
                                    onClick={() => inputRef.current.click()}
                                >
                  Upload a Document
                                </button>
                                <h2 className={style.or}>OR</h2>
                                <h1 className={style.muted}>Drop a File</h1>{" "}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
