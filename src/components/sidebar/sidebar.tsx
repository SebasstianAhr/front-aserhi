import ItemNavigationMenu from '../item-navigation-menu/item-navigation-menu';
import { PageRouterEnum } from '../../core/enum/page-router.enum';
import {MenuItem} from '../../core/interface/menu-item.interface'
import {MenuItemsUtil} from '../../core/utils/menu-items.util'
import logo from '../../assets/Logo.jpeg';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = (): JSX.Element => {
  const menuItems: MenuItem[] = MenuItemsUtil.getMenuItems()

  return (
    <div className="sidebar">
      <div className="navigation__component">
        <div className="sidebar__logo-aserhi">
          <img
            className="sidebar__image-logo-aserhi"
            src={logo}
            alt="Logo Aserhi"
          />
        </div>
        <div className="navigation__component-items">
          <Link className='navigation__link' to={PageRouterEnum.Home}>
            <svg aria-hidden="true" width={21} height={21} focusable="false" data-prefix="fas" data-icon="house" className="svg-inline--fa fa-house fa-sm " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" color="#02A4E6"><path fill="currentColor" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path></svg>
            <p>Home</p>
          </Link>
          <ItemNavigationMenu menuItems={menuItems} />
        </div>
      </div>
      <span className="log__out">
        <svg xmlns="http://www.w3.org/2000/svg" color="#84cc16" height={22} width={22} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>

        <p>Cerrar sesión</p>
      </span>
    </div>
  );
};

export default Sidebar;
