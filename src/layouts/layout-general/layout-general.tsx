import SideBar from "../../components/side-bar/side-bar"
import NavBar from "../../components/nav-bar/nav-bar"
import './layout-general.css'
import { ReactNode } from "react"

interface LayoutGeneralProps {
    children: ReactNode
}

const LayoutGeneral = ({ children }: LayoutGeneralProps): JSX.Element => {
    return (
        <div>
            <SideBar />
            <div>
                <NavBar />
                <div>{children}</div>
            </div>
        </div>
    )
}

export default LayoutGeneral