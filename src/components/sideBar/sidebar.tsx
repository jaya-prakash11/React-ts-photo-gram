import { cn } from "@/lib/utils";
import {
  Bell,
  BellIcon,
  BookImage,
  BookImageIcon,
  Camera,
  CameraIcon,
  House,
  HouseIcon,
  LogOut,
  Settings,
  SettingsIcon,
  UserRoundPen,
  UserRoundPenIcon,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { useLocation } from "react-router-dom";
import { useUserAuth } from "@/context/userAuthContext";

type Props = {};
type IAppProps = {};
const sideBarMenu = [
  {
    name: "Home",
    link: "/",
    icon: <HouseIcon />,
  },
  {
    name: "Add Photos",
    link: "/addPhotos",
    icon: <CameraIcon />,
  },
  {
    name: "My Photos",
    link: "/myPhotos",
    icon: <BookImageIcon />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <UserRoundPenIcon />,
  },
  {
    name: "Notification",
    link: "/Notification",
    icon: <BellIcon />,
  },
  {
    name: "Direct",
    link: "/Direct",
    icon: <BellIcon />,
  },
  {
    name: "Settings     ",
    link: "/Settings",
    icon: <SettingsIcon />,
  },
];
const Sidebar: React.FunctionComponent<IAppProps> = ({}: Props) => {
  const { pathname } = useLocation();
  const { logOut } = useUserAuth();
  return (
    <div className="flex flex-col w-full  ml-4 gap-y-4">
      <div className="text-3xl text-white">PhotoGram</div>
      {sideBarMenu.map((res) => {
        return (
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              pathname === res.link
                ? "bg-white text-black hover:bg-white  rounded-none  "
                : "hover:bg-slate-950 hover:text-white bg-transparent ",
              "h-8 , justify-start"
            )}
          >
            <NavLink
              className={" flex ml-9 text-xl font-medium gap-x-4"}
              to={res.link}
            >
              <span>
                {/* <img src={res.icon}></img> */}
                {res.icon}
              </span>
              <span>{res.name}</span>
            </NavLink>
          </div>
        );
      })}
      <div
        className={cn(
          buttonVariants({ variant: "default" }),
          1 > 2
            ? "bg-white text-black hover:bg-white  rounded-none  "
            : "hover:bg-slate-950 hover:text-white bg-transparent ",
          "h-8 , justify-start"
        )}
      >
        <button
          onClick={() => logOut()}
          className={" flex ml-9 text-xl font-medium gap-x-4"}
        >
          <LogOut />
          <span>{"Logout"}</span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
