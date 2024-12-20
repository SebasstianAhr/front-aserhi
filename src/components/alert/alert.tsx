import "./alert.css"
import { IconAlerts } from "../../core/utils/alert-icons.util";

interface AlertProps {
  message: string;
  onCancel: () => void;
  onContinue: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onCancel, onContinue }) => {
  return (
    <div className="alert__overlay">
      <div className="alert__box">
        <span className="alert__icon">
          {IconAlerts.find((icon) => icon.nameIcon === "warning")?.icon}
        </span>
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
