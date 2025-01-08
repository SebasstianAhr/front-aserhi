import { PageRouterEnum } from '../../core/enum/page-router.enum';
import { AuthContext } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Alert from '../alert/alert';
import './logout-button.css';

const LogoutButton = (): JSX.Element => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
      navigate(PageRouterEnum.Login);
    }
  };

  const handleLogoutClick = () => {
    setShowAlert(true);
  };

  const handleConfirmLogout = () => {
    setShowAlert(false);
    handleLogout();
  };

  const handleCancelLogout = () => {
    setShowAlert(false);
  };

  return (
    <>
      <span onClick={handleLogoutClick} className="log__out">
        <svg xmlns="http://www.w3.org/2000/svg" color="#84cc16" height={22} width={22} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
        <p>Cerrar sesión</p>
      </span>
      {showAlert && (
        <Alert
          message="¿Estás seguro de que quieres cerrar sesión?"
          onCancel={handleCancelLogout}
          onContinue={handleConfirmLogout}
        />
      )}
    </>
  );
};

export default LogoutButton;