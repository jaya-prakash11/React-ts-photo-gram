import React from "react";
import Sidebar from "../sideBar/sidebar";
import UserList from "../userList";

type Props = {};
type IAppProps = {
  children: React.ReactNode;
};
const Layout: React.FunctionComponent<IAppProps> = ({ children }) => {
  return (
    <div className="flex bg-white">
      <aside className="flex gap-x-4 bg-gray-800 fixed top-0 left-0 z-40 lg:w-60 h-screen">
        <Sidebar />
      </aside>
      <div className="flex w-full lg:ml-64  lg:mr-64 mt-14">{children}</div>
      <aside className="flex gap-x-4 bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-screen">
        <UserList />
      </aside>
    </div>
  );
};
export default Layout;
