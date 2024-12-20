import { useState } from 'react';
import './burger-menu.css'
import Sidebar from '../sidebar/sidebar';

const BurgerMenu = () => {



    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='burger-menu__general-content'>
            <svg
                onClick={toggleMenu}
                className="burger-menu__icon-open"
                height={32}
                width={32}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
            >
                <path
                    fill="#000"
                    d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                />
            </svg>
            <div className={`burger-menu__content ${isOpen ? 'menu__open' : 'menu__close'}`}>
                <Sidebar />
            </div>
            {isOpen && (
                <div className='burguer-menu__overlay' onClick={toggleMenu}></div>
            )}
        </div>
    );
};

export default BurgerMenu;
