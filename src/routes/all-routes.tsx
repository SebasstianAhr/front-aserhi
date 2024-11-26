import ManagementProposals from "../pages/commercial-management/management-proposals/management-proposals"
import PotentialCustomers from "../pages/commercial-management/potential-customers/potential-customers"
import ContractManagement from "../pages/commercial-management/contract-management/contract-management"
import RevisionProposals from "../pages/commercial-management/revision-proposals/revision-proposals"
import ContractClauses from "../pages/admin/contract-clauses/contract-clauses"
import WasteManagement from "../pages/admin/waste-management/waste-management"
import Employees from "../pages/human-talent-management/employees/employees"
import Customers from "../pages/commercial-management/customers/customers"
import Charges from "../pages/human-talent-management/charges/charges"
import ForgotPassword from "../pages/forgot-password/forgot-password"
import { PageRouterEnum } from "../core/enum/page-router.enum"
import Profiles from "../pages/admin/profiles/profiles"
import { Routes, Route } from "react-router-dom"
import Login from "../pages/login/login"
import Home from "../pages/home/home"
import LayoutGeneral from "../layouts/layout-general/layout-general"

const AllRoutes = () => {
  return (
    <Routes>


      <Route path={PageRouterEnum.Login} element={<Login />} />
      <Route path={PageRouterEnum.ForgotPassword} element={<ForgotPassword />} />
      <Route path="/*" element={
        <LayoutGeneral>
          <Routes>
            <Route path={PageRouterEnum.Home} element={<Home />} />
            <Route path={PageRouterEnum.Employees} element={<Employees />} />
            <Route path={PageRouterEnum.Charges} element={<Charges />} />
            <Route path={PageRouterEnum.Customers} element={<Customers />} />
            <Route path={PageRouterEnum.PotentialCustomers} element={<PotentialCustomers />} />
            <Route path={PageRouterEnum.ManagementProposals} element={<ManagementProposals />} />
            <Route path={PageRouterEnum.RevisionProposals} element={<RevisionProposals />} />
            <Route path={PageRouterEnum.ContractManagement} element={<ContractManagement />} />
            <Route path={PageRouterEnum.Profiles} element={<Profiles />} />
            <Route path={PageRouterEnum.WasteManagement} element={<WasteManagement />} />
            <Route path={PageRouterEnum.ContractClauses} element={<ContractClauses />} />
          </Routes>
        </LayoutGeneral>
      }></Route>


    </Routes>
  )
}

export default AllRoutes