import { useLocation } from "react-router-dom";
import { Header } from "../../Components";
import style from "./ResultPage.module.css";

const ResultPage = () => {
    const location = useLocation();
    const state = location.state;
    console.log(state);

    return (
        <div className={style.mainContainer}>
            <Header />
            <div className={style.resultContainer}>
                <h1>
                    {state.name}
                </h1>
                <div>
                    {// This is to split the data into paragraphs
                        state.data.split("\n").map((text:string, index:number) => (
                            <>
                                <p key={index}>{text}</p>
                            </>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
