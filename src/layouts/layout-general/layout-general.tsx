import Sidebar from "../../components/sidebar/sidebar"
import Navbar from "../../components/navbar/navbar"
import './layout-general.css'
import AllRoutes from "../../components/routes/all-routes"


const LayoutGeneral = (): JSX.Element => {
    return (
        <div className="layout__general">
            <div className="layout__sidebar-part">
                <Sidebar />
            </div>
            <div className="layout__next-content">
                <Navbar />
                <div className="layout__principal-content"><AllRoutes /></div>
            </div>
        </div>
    )
}

export default LayoutGeneral