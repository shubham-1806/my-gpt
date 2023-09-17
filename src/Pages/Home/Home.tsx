import { Header } from '../../Components';
import styles from './Home.module.css';
import stock from "../../assets/stock.svg";
import { useNavigate } from "react-router-dom";
const Home = () => {

    const navigate = useNavigate();
    return (
        <div className={styles.mainContainer}>
            <Header/>
            <div className={styles.home}> 
                <div>
                    <h1 className={styles.grad}>
                        Your Papers, <br/> 
                        Our Precision
                    </h1> 
                    <p className={styles.subtext}>
                        Meet SummaryAI, your friendly research companion! SummaryAI is like a magic wand for complex research papers. It uses the magic of artificial intelligence to turn lengthy academic documents into easy-to-digest summaries. Say goodbye to long hours of reading and hello to quick, clear, and friendly insights. With SummaryAI, understanding research is a breeze!
                    </p>
                    <button className={styles.try} onClick={()=>{navigate("/summary")}}>
                        Try Out Now
                    </button>
                </div>
                <div>
                    <img src={stock} alt="stock"/>
                </div>
            </div>
        </div>
    );
}

export default Home;
