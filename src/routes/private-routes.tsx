import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { PageRouterEnum } from "../core/enum/page-router.enum";

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Navigate to={PageRouterEnum.Login} />;
  }

  const { user } = authContext;

  return user ? <Outlet /> : <Navigate to={PageRouterEnum.Login} />;
};

export default PrivateRoute;