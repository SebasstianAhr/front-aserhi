import React from "react";

interface AlertProps {
  message: string;
  onCancel: () => void;
  onContinue: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onCancel, onContinue }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p className="alert-message">{message}</p>
        <div className="alert-buttons">
          <button className="alert-button cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="alert-button continue" onClick={onContinue}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
