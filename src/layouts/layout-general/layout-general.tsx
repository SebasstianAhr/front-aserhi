import { ChildrenProps } from "../../core/interface/layout-general.interface";
import BurgerMenu from "../../components/burger-menu/burger-menu";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./layout-general.css";
import LogoutButton from "../../components/logout-button/logout-button";

const LayoutGeneral = ({ children }: ChildrenProps): JSX.Element => {

    return (
        <div className="layout__general">
            <div className="laytout__burger-menu">
                <BurgerMenu />
            </div>
            <div className="layout__sidebar-part">
                <div className="layout__sidebar-menu">
                    <div>
                        <Sidebar />
                    </div>
                </div>
            </div>
            <div className="layout__next-content">
                <Navbar />
                <div className="layout__principal-content">{children}</div>
            </div>
        </div>
    );
};

export default LayoutGeneral;
