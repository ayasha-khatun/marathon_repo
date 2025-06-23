import { createBrowserRouter } from "react-router";
import Home from '../Pages/Home/Home';
import RootLayouts from './../Layouts/RootLayouts';
import Marathons from '../Pages/Marathons/Marathons';
import DashboardLayouts from '../Layouts/DashboardLayouts';
import Login from './../Pages/Auth/Login';
import Register from './../Pages/Auth/Register';
import AddMarathon from "../Pages/Dashboard/AddMarathon";
import MarathonDetails from "../Pages/Marathons/MarathonDetails";
import RegisterMarathon from "../Pages/Marathons/RegisterMarathon";
import MyApplyList from "../Pages/Dashboard/MyApplyList";
import MyMarathons from "../Pages/Dashboard/MyMarathons";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/marathons",
        Component: Marathons
      },
      {
        path: "/marathon/:id",
        Component: MarathonDetails
      },
      {
        path: "/dashboard",
        Component: DashboardLayouts,
        children: [
          {
            path: "add-marathon",
            Component: AddMarathon
          },
          {
            path: "my-apply",
            Component: MyApplyList
          },
          { 
            path: 'my-marathons', 
            Component: MyMarathons
          }
          
        ]
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "register-marathon/:id",
        Component: RegisterMarathon
      },
    ]
  }
]);

export default router;
