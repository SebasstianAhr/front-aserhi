import { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import BurgerMenu from "../../components/burger-menu/burger-menu";
import "./layout-general.css";

interface ChildrenProps {
    children: JSX.Element;
}

const LayoutGeneral = ({ children }: ChildrenProps): JSX.Element => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="layout__general">
            <BurgerMenu onClick={toggleSidebar} />
            {isSidebarVisible && (
                <div className="layout__sidebar-part">
                    <div className="layout__sidebar-menu">
                        <Sidebar />
                    </div>
                </div>
            )}
            <div className="layout__next-content">
                <Navbar />
                <div className="layout__principal-content">{children}</div>
            </div>
        </div>
    );
};

export default LayoutGeneral;
