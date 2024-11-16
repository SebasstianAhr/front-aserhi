import Employees from "../../pages/human-talent-management/employees/employees"
import { Routes, Route } from "react-router-dom"
import Home from "../../pages/home/home"
import { PageRouterEnum } from "../../core/enum/page-router.enum"
import Charges from "../../pages/human-talent-management/charges/charges"


const AllRoutes = () => {
  return (
    <Routes>
        <Route path={PageRouterEnum.Home} element={<Home/>}/>
        <Route path={PageRouterEnum.Employees} element={<Employees/>}/>
        <Route path={PageRouterEnum.Charges} element={<Charges/>}/>
    </Routes>
  )
}

export default AllRoutes