export  interface MenuItem {
    icon?: JSX.Element
    title: string;
    subMenus: MenuItem[];
    link: string
}

export interface ItemNavigationMenuProps {
    menuItems: MenuItem[];
  }