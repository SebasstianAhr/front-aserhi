import { useState, useContext, useEffect, useRef } from 'react';
import LogoutButton from '../logout-button/logout-button';
import { AuthContext } from '../../context/auth-context';
import imgProfile from '../../assets/profile-image.jpg';
import './menu-profile.css';

const MenuProfile = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} onClick={toggleDropdown} className='menu__profile'>
      <svg
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
      {authContext && authContext.user && (
        <div className={`dropdown ${isOpen ? 'dropdown__show' : 'dropdown__hide'}`}>
          <div className='dropdown__content'>
            <img className='img__profile-menu' src={imgProfile} alt="profile image" />
            <div>
              <p>{authContext.user.name} {authContext.user.lastName}</p>
              <p>{authContext.user.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default MenuProfile;