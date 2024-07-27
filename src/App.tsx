import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./context/userAuthContext";

type Props = {};
type IAppProps = {};
const App: React.FunctionComponent<IAppProps> = ({}: Props) => {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
};
export default App;
