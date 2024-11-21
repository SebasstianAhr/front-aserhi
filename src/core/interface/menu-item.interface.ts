export  interface MenuItem {
    icon?: JSX.Element
    title: string;
    subMenus: MenuItem[];
    link: string
}