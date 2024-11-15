import { useState, ReactNode } from 'react';
import './item-navigation-menu.css';

interface Submodule {
    name: string;
    icon?: ReactNode; 
}

interface MenuItem {
    title: string;
    icon?: ReactNode; 
    submodules: Submodule[];
}

interface MenuItems {
    menuItems: MenuItem[];
}

const ItemNavigationMenu = ({ menuItems }: MenuItems): JSX.Element => {
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
                        {item.icon && <span className="menu-icon">{item.icon}</span>}
                        <span className="menu-title">{item.title}</span>
                    </div>
                    {openMenu === item.title && (
                        <ul className="item__submodule-list">
                            {item.submodules.map((submodule: Submodule) => (
                                <li key={submodule.name} className="item__submodule">
                                    {submodule.icon && (
                                        <span className="submodule-icon">{submodule.icon}</span>
                                    )}
                                    <span className="submodule-name">{submodule.name}</span>
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
