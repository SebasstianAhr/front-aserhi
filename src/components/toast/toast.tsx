import { ToastProps } from '../../core/interface/toast.interface';
import { IconAlerts } from '../../core/utils/alert-icons.util';
import './toast.css';

const Toast = ({ variantAlert, message, show }: ToastProps): JSX.Element => {
  const classVariants = {
    success: 'toast__box toast__box--success',
    danger: 'toast__box toast__box--danger',
    warning: 'toast__box toast__box--warning',
    info: 'toast__box toast__box--info',
  };
  return (
    <div className={`toast ${show ? 'toast__show' : 'toast__hide'}`}>
      <div className={`toast-content__box ${classVariants[variantAlert || 'info']}`}>
        {IconAlerts.find((icon) => icon.nameIcon === variantAlert)?.icon}
        {message}
      </div>
    </div>
  );
};

export default Toast;