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
            console.log("bro listener called bro")
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
