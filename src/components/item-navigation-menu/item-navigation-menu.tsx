import { useState} from 'react';
import { MenuItem } from '../../core/interface/menu-item.interface';
import './item-navigation-menu.css';
import { Link } from 'react-router-dom';

interface ItemNavigationMenuProps{
    menuItems: MenuItem[];
}

const ItemNavigationMenu = ({ menuItems }: ItemNavigationMenuProps): JSX.Element => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (title: string) => {
        setOpenMenu(openMenu === title ? null : title);
    };

    return (
        <div className="content__items-dropdown">
            {menuItems.map((item: MenuItem) => (
                <div key={item.title} className="item__dropdown">
                    <div
                        className="item__dropdown-with-submodules"
                        onClick={() => toggleMenu(item.title)}
                    >
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.title}</span>
                    </div>
                    {openMenu === item.title && (
                        <ul className="item__submodule-list">
                            {item.subMenus.map((subMenu: MenuItem) => (
                                <li key={subMenu.title} className="item__submodule">
                                    {subMenu.icon}
                                    <Link to={subMenu.link}>
                                    <span>{subMenu.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ItemNavigationMenu;
