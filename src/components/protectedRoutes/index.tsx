import { useUserAuth } from "@/context/userAuthContext";
import { getAuth } from "firebase/auth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};
type IAppProps = {};
const ProtectRoutes: React.FunctionComponent<IAppProps> = ({}: Props) => {
  const auth = getAuth();

  const [user, loading] = useAuthState(auth);
  // const { user } = useUserAuth();
  const location = useLocation();

  if (loading) {
    return <div>...Loading</div>;
  }
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ location }}></Navigate>
  );
};
export default ProtectRoutes;
