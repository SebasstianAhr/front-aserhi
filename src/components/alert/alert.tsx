import "./alert.css"

import React from "react";

interface AlertProps {
  message: string;
  onCancel: () => void;
  onContinue: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onCancel, onContinue }) => {
  return (
    <div className="alert__overlay">
      <div className="alert__box">
        <p className="alert__message">{message}</p>
        <div className="alert__buttons">
          <button className="alert__button alert__button--cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="alert__button alert__button--continue" onClick={onContinue}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
