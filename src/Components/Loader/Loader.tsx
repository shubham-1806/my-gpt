import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.overlay}>
      <span className={style.loader}></span>
    </div>
  );
};

export default Loader;
