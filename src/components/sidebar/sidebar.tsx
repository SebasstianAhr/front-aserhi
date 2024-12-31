import ItemNavigationMenu from '../item-navigation-menu/item-navigation-menu';
import { MenuItem } from '../../core/interface/menu-item.interface';
import { MenuItemsUtil } from '../../core/utils/menu-items.util';
import logo from '../../assets/Logo.jpeg';
import './sidebar.css';
import LogoutButton from '../logout-button/logout-button';

const Sidebar = (): JSX.Element => {
  const menuItems: MenuItem[] = MenuItemsUtil.getMenuItems();

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
          <ItemNavigationMenu menuItems={menuItems} />
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;