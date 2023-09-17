import style from "./Toggle.module.css";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleRef: React.MutableRefObject<any>;
  toggleFunc: () => void;
}

const Toggle = ({ toggleRef, toggleFunc }: Props) => {
  return (
    <div className={style.wrapper}>
    <p>Single Column</p>
      <label className={style.switch}>
        <input type="checkbox" ref={toggleRef}  onChange={()=>toggleFunc()}/>
        <span className={`${style.slider}  ${style.round}`}></span>
      </label>
    <p>Double Column</p>

    </div>
  );
};

export default Toggle;
