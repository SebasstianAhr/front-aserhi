import Sidebar from "../../components/sidebar/sidebar"
import Navbar from "../../components/navbar/navbar"
import './layout-general.css'
import { ReactNode } from "react"

interface LayoutGeneralProps {
    children: ReactNode
}

const LayoutGeneral = ({ children }: Readonly<LayoutGeneralProps>): JSX.Element => {
    return (
        <div className="layout__general">
            <div className="layout__sidebar-part">
                <Sidebar />
            </div>
            <div className="layout__next-content">
                <Navbar />
                <div className="layout__principal-content">{children}</div>
            </div>
        </div>
    )
}

export default LayoutGeneral