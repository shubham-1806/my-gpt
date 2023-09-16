import { useEffect, useRef } from "react";
import { Header } from "../../Components";
import style from "./Summary.module.css";

const Summary = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  const upload = ()=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const file = (window as any).file;
    // console.log(file.getFile())
    console.log("uploading")
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const drop = (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      for (const f of event.dataTransfer.files) {
        console.log("File Path of dragged files: ", f.path);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dragover = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const dragenter = () => {
      console.log("dragenter");
      ref.current.style.background = "#DEDEDE";
    };

    const dragleave = () => {
      console.log("dragenter");
      ref.current.style.background = "#EDF0EF";
    };

    const element = ref.current;

    element.addEventListener("drop", drop);
    element.addEventListener("dragover", dragover);
    element.addEventListener("dragenter", dragenter);
    element.addEventListener("dragleave", dragleave);

    return () => {
      if (element) {
        element.removeEventListener("drop", drop);
        element.removeEventListener("dragover", dragover);
        element.removeEventListener("dragenter", dragenter);
        element.removeEventListener("dragleave", dragleave);
      }
    };
  }, []);
  return (
    <div className={style.mainContainer}>
      <Header />
      <div className={style.dropWrapper}>
        <h1 className={style.dropTitle}>Summarise a Research Paper</h1>
        <p className={style.subtext}>
          Summarise any article, and accelerate your reading and learning with
          our AI technology. Perfect also for screening, review and research
          communication
        </p>
        <div className={style.dropBox}>
          <div className={style.dropBoxInner} ref={ref}>
            <button className={style.try} onClick={()=>upload()}>Upload a Document</button>
            <h2 className={style.or}>OR</h2>
            <h1 className={style.muted}>Drop a File</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
