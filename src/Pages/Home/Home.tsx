import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className={styles.mainContainer}>
            <h1>Home</h1>
            <Link to="/result">Result</Link>
        </div>
    );
}

export default Home;
