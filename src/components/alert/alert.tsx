import { useState, useEffect } from "react";
import { AlertProps } from "../../core/interface/alert-props.interface";
import { IconAlerts } from "../../core/utils/alert-icons.util";
import "./alert.css";

const Alert = ({ message, onCancel, onContinue }: AlertProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (callback: () => void) => {
    setIsExiting(true);
    setTimeout(() => {
      callback();
    }, 400);
  };

  return (
    <div
      className={`alert__overlay ${isVisible ? "alert__overlay--visible" : ""} ${isExiting ? "alert__overlay--exiting" : ""
        }`}
    >
      <div
        className={`alert__box ${isVisible ? "alert__box--visible" : ""} ${isExiting ? "alert__box--exiting" : ""
          }`}
      >
        <span className="alert__icon">
          {IconAlerts.find((icon) => icon.nameIcon === "warning")?.icon}
        </span>
        <p className="alert__message">{message}</p>
        <div className="alert__buttons">
          <button
            className="alert__button alert__button--cancel"
            onClick={() => handleClose(onCancel)}
          >
            Cancelar
          </button>
          <button
            className="alert__button alert__button--continue"
            onClick={() => handleClose(onContinue)}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
