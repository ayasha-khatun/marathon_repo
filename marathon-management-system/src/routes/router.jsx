import { createBrowserRouter } from "react-router";
import Home from '../Pages/Home/Home';
import RootLayouts from '../Layouts/RootLayouts';
import Marathons from '../Pages/Marathons/Marathons';
import DashboardLayouts from '../Layouts/DashboardLayouts';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import AddMarathon from "../Pages/Dashboard/AddMarathon";
import MarathonDetails from "../Pages/Marathons/MarathonDetails";
import RegisterMarathon from "../Pages/Marathons/RegisterMarathon";
import MyApplyList from "../Pages/Dashboard/MyApplyList";
import MyMarathons from "../Pages/Dashboard/MyMarathons";
import ErrorPage from "../Pages/Error/ErrorPage";
import PrivateRoute from '../Contexts/PrivateRoutes/PrivateRoutes';
import JwtRefreshHandler from "../Pages/Auth/JwtRefreshHandler";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Blog from "../Pages/Blog/Blog";
import DashboardOverview from "../Pages/Dashboard/DashboardOverView";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <JwtRefreshHandler>
        <RootLayouts />
      </JwtRefreshHandler>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/blog", element: <Blog /> },
      { path: "/marathons", element: <Marathons /> },
      { path: "/marathon/:id", element: <MarathonDetails /> },
      {
        path: "register-marathon/:id",
        element: (
          <PrivateRoute>
            <RegisterMarathon />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayouts />
          </PrivateRoute>
        ),
        children: [
          { path: "add-marathon", element: <AddMarathon /> },
          { path: "/dashboard", element: <DashboardOverview/> },
          { path: "my-apply", element: <MyApplyList /> },
          { path: "my-marathons", element: <MyMarathons /> },
        ],
      },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
