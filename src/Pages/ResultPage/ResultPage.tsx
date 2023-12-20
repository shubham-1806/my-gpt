import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../Components';
import style from './ResultPage.module.css';
import back from '../../assets/back.svg';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;
    
    return (
        <div className={style.mainContainer}>
            <Header />
            <div className={style.resultContainer}>
                <div
                    style={{ color: "#0c746e", fontFamily: "Inter", fontSize: "1.2rem", cursor: "pointer" }}
                    onClick={() => {
                        navigate('/saved');
                    }}
                >
                    <img src={back} /> Back
                </div>
                <h1>{state.name}</h1>
                <div>
                    {
                        // This is to split the data into paragraphs
                        state.data.split('\n').map((text: string, index: number) => (
                            <>
                                <p key={index}>{text}</p>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
