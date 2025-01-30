import { ChildrenProps } from "../../core/interface/layout-general.interface";
import BurgerMenu from "../../components/burger-menu/burger-menu";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./layout-general.css";

const LayoutGeneral = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <div className="layout__general">
      <div className="layout__burger-menu">
        <BurgerMenu>
          <Sidebar />
        </BurgerMenu>
      </div>
      <div className="layout__sidebar-part">
        <div className="layout__sidebar-menu">
          <Sidebar />
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