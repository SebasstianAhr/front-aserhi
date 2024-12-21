import React from 'react';
import { IconAlerts } from '../../core/utils/alert-icons.util';
import './toast.css';

interface ToastProps {
  variantAlert: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ variantAlert, message, show }) => {
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