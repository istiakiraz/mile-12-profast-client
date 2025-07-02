import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayouts from "../layouts/MainLayouts";
import HomePage from "../pages/Home/HomePage";
import AuthLayouts from "../layouts/AuthLayouts";
import SignIn from "../pages/Authpages/SignIn";
import SignUp from "../pages/Authpages/SignUp";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import AddParcel from "../pages/SendParcel/AddParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
        {
            index: true,
            Component: HomePage
        },
        {
          path: "coverage",
          Component : Coverage,
          loader: () => fetch('../../public/warehouses.json')
        },
        {
          path: 'sendParcel',
          element: <PrivateRoute>
            <AddParcel></AddParcel>
          </PrivateRoute>
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
      },
      {
        path:'signup',
        Component: SignUp
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'myParcels',
        Component: MyParcels
      },
      {
        path: 'payment/:id',
        Component: Payment
      }
    ]
  }
]);