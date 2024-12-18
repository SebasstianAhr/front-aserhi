import { useState } from 'react';
import './burger-menu.css'
import { Link } from 'react-router-dom';
import { PageRouterEnum } from '../../core/enum/page-router.enum';
import ItemNavigationMenu from '../item-navigation-menu/item-navigation-menu';
import { MenuItem } from '../../core/interface/menu-item.interface';
import { MenuItemsUtil } from '../../core/utils/menu-items.util';

const BurgerMenu = () => {

    const menuItems: MenuItem[] = MenuItemsUtil.getMenuItems()


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
                    fill="#fff"
                    d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                />
            </svg>
            <div className={`burger-menu__content ${isOpen ? 'menu__open' : 'menu__close'}`}>
                <div className='burger-menu__close'>
                    <svg onClick={toggleMenu} className='burger-menu__icon-close' xmlns="http://www.w3.org/2000/svg" height={30} width={30} viewBox="0 0 384 512"><path fill="#ffffff" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
                </div>
                <div className="navigation__component-items">
                    <Link className='navigation__link' to={PageRouterEnum.Home}>
                        <svg aria-hidden="true" width={21} height={21} focusable="false" data-prefix="fas" data-icon="house" className="svg-inline--fa fa-house fa-sm " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" color="#02A4E6"><path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path></svg>
                        <p>Home</p>
                    </Link>
                    <ItemNavigationMenu menuItems={menuItems} />
                </div>
            </div>
            {isOpen && (
                <div className='burguer-menu__overlay' onClick={toggleMenu}>

                </div>
            ) }
        </div>
    );
};

export default BurgerMenu;
