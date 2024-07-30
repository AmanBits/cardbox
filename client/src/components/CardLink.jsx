import style from "../assets/css/cardlink.module.css";
const CardLink = ({ history }) => {
  return (
    <div className="text-center">
      {history.map((item) => {
        return (
          
          <a className={`${style.itemlink}`} key={item} href={item}>
            <span>Copy</span>
          </a>
        );
      })}
    </div>
  );
};

export default CardLink;
