import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import profile from "../../assets/profile.svg"
import logo from "../../assets/logo.svg"

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={style.header}>
            <div className={style.left}>
                <div className={style.menuLeft} role="navigation">
                    <div className={style.menuToggle}>
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul className={style.menuItem}>
                            <br/>
                            <br/>
                            <li style={{cursor:"pointer"}}>
                                <a onClick={()=>navigate("/")}>Home</a>
                            </li>
                            <li style={{cursor:"pointer"}}>
                                <a onClick={()=>navigate("/summary")}>Summarise</a>
                            </li>
                            <li style={{cursor:"pointer"}}>
                                <a onClick={()=>navigate("/grammar")}>Grammar Check</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div onClick={()=>navigate("/")} style={{cursor:"pointer", display:"flex", flexFlow:"row nowrap", gap:"1rem"}}>
                    <img src={logo} alt="logo" />
                    <h2 className={style.title}>MyGPT</h2>
                </div>
            </div>
            <div className={style.profile}>
                <img src={profile} alt="profile"/>
            </div>
        </header>
    );
};

export default Header;
