import { useState } from 'react';
import './burger-menu.css';

interface BurgerMenuProps {
  children: React.ReactNode;
  color?: string;
  withBorder?: boolean;
  isAbsolute?: boolean;
}

const BurgerMenu = ({ children, color = "#000", withBorder = true, isAbsolute = true }: BurgerMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`burger-menu__general-content ${isAbsolute ? 'burger-menu__general-content--absolute' : ''}`}>
      <svg
        onClick={toggleMenu}
        className={`burger-menu__icon-open ${withBorder ? 'burger-menu__icon-open--border' : ''}`}
        height={32}
        width={32}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill={color}
          d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
        />
      </svg>
      <div className={`burger-menu__content ${isOpen ? 'menu__open' : 'menu__close'}`}>
        {children}
      </div>
      {isOpen && (
        <div className='burger-menu__overlay' onClick={toggleMenu}></div>
      )}
    </div>
  );
};

export default BurgerMenu;