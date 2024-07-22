import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {};
type IAppProps = {};
const ProtectRoutes: React.FunctionComponent<IAppProps> = ({}: Props) => {
  const isAuth: boolean = false;
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ location }}></Navigate>
  );
};
export default ProtectRoutes;
