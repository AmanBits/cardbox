import style from "../assets/css/header.module.css";
const Header = () => {
  const optionHandle = (event) => {
    alert("Hello");
  };
  return (
    <div className={`col`}>
      <div className="row">
        <div className="col-10">
          <h5 className="m-0 mx-2">Mohammad Aman</h5>
          <p className="m-0 mt-1 mx-2">
            Title : This is awesome, its new experinece !{" "}
            <span className={`${style.timezone}`}>12:00:12 21/22/2023</span>
          </p>
        </div>
        <div
          className={`${style.optionbtn} col-2 text-center`}
          onClick={optionHandle}
        >
          ...
        </div>
      </div>
    </div>
  );
};

export default Header;
