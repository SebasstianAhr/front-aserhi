import { useState, useContext } from 'react';
import './menu-profile.css';
import { AuthContext } from '../../context/auth-context';
import LogoutButton from '../logout-button/logout-button';

const MenuProfile = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='menu__profile'>
      <svg
        onClick={toggleDropdown}
        xmlns="http://www.w3.org/2000/svg"
        color='#000'
        width={15}
        height={15}
        fill="none"
        viewBox="0 -2 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
      {isOpen && authContext && authContext.user && (
        <div className='dropdown'>
          <p>{authContext.user.identification}</p>
          <p>{authContext.user.email}</p>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default MenuProfile;