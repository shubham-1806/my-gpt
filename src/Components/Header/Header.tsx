import { useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import profile from '../../assets/profile.svg';
import logo from '../../assets/logo.svg';
import download from '../../assets/download.svg';
// import chat from '../../assets/chat.svg';
import bookmark from '../../assets/bookmark.svg';
import grammarChecklogo from '../../assets/GrammarCheckLogo.svg';

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
                            <br />
                            <br />
                            <li style={{ cursor: 'pointer' }}>
                                <a onClick={() => navigate('/summary')}>
                                    <img src={download} />
                                    Upload a File
                                </a>
                            </li>
                            {/* <li style={{ cursor: 'pointer' }}>
                                <a onClick={() => navigate('/chat')}>
                                    <img src={chat} />
                                    Chat to Summarise
                                </a>
                            </li> */}
                            <li style={{ cursor: 'pointer' }}>
                                <a onClick={() => navigate('/grammar')}>
                                    <img src={grammarChecklogo} />
                                    Grammar Check
                                </a>
                            </li>
                            <li style={{ cursor: 'pointer' }}>
                                <a onClick={() => navigate('/saved')}>
                                    <img src={bookmark} />
                                    Saved File Uploads
                                </a>
                            </li>

                            <div
                                onClick={() => navigate('/')}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexFlow: 'row nowrap',
                                    gap: '1rem',
                                    width: '100%',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: '50rem',
                                    left: '0',
                                }}
                            >
                                <img src={logo} alt="logo" />
                                <h2 className={style.title}>MyGPT</h2>
                            </div>
                        </ul>
                    </div>
                </div>
                <div
                    onClick={() => navigate('/')}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        gap: '1rem',
                    }}
                >
                    <img src={logo} alt="logo" />
                    <h2 className={style.title}>MyGPT</h2>
                </div>
            </div>
            <div className={style.profile}>
                <img src={profile} alt="profile" />
            </div>
        </header>
    );
};

export default Header;
