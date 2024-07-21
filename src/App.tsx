import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

type Props = {};
type IAppProps = {};
const App: React.FunctionComponent<IAppProps> = ({}: Props) => {
  return <RouterProvider router={routes} />;
};
export default App;
