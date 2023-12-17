import style from './Loader.module.css';

interface Props {
    rounded?: boolean;
}
const Loader = ({ rounded }: Props) => {
    return (
        <div className={style.overlay} style={{ borderRadius: rounded ? '50px' : '0px' }}>
            <span className={style.loader}></span>
        </div>
    );
};

export default Loader;
