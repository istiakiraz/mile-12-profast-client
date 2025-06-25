import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayouts from "../layouts/MainLayouts";
import Hero from "../pages/Home/HomeComponents/Hero";
import HomePage from "../pages/Home/HomePage";
import AuthLayouts from "../layouts/AuthLayouts";
import SignIn from "../pages/Authpages/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
        {
            index: true,
            Component: HomePage
        }
    ]
  },
  {
    path:"/",
    Component: AuthLayouts,
    children: [
      {
        path: 'signin',
        Component: SignIn
      }
    ]

  }
]);