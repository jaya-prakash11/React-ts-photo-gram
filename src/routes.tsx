import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Error from "./pages/error";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import MyPhotos from "./pages/myPhotos";
import ProtectRoutes from "./components/protectedRoutes";
import AddPhotos from "./pages/addPhotos";
import EditProfile from "./pages/editProfile";

const routes = createBrowserRouter([
  {
    element: <ProtectRoutes />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
        errorElement: <Error />,
      },
      {
        path: "/myPhotos",
        element: <MyPhotos />,
        errorElement: <Error />,
      },
      {
        path: "/addPhotos",
        element: <AddPhotos />,
        errorElement: <Error />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
]);

export default routes;
