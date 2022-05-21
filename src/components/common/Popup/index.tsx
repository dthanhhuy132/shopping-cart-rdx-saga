import Button from "../Button";
import "./pop-up.css";

interface PopupProps {
  text?: string;
  handleClickOk?: () => void;
  handleClickCancel?: () => void;
  isShowPopup: boolean;
  subText?: string;
}

const PopUp: React.FC<PopupProps> = ({
  text = "Are you sure to submit?",
  handleClickCancel,
  handleClickOk,
  isShowPopup,
  subText = "",
}) => {
  return (
    <div className={`popup ${isShowPopup && "popup-show"}`}>
      <div className="popup-background" onClick={handleClickCancel}></div>
      <div className="popup-content">
        <h5 className="popup-text">{text}</h5>
        <p className="popup-text-sub">{subText}</p>
        <div className="popup-button">
          <button className="btn btn-danger " onClick={handleClickOk}>
            Sure
          </button>
          <button className="btn btn-primary" onClick={handleClickCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
