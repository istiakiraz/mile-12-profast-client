import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayouts from "../layouts/MainLayouts";
import Hero from "../pages/Home/Hero";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
        {
            index: true,
            Component: Hero
        }
    ]
  },
]);