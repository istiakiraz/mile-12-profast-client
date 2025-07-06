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
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import TrackParcel from "../pages/Dashboard/Payment/TrackParcel";
import RiderForm from "../pages/Rider/RiderForm";
import PendingRider from "../pages/Dashboard/RiderStatus/PendingRider";
import ActiveRider from "../pages/Dashboard/RiderStatus/ActiveRider";
import MakeAdmin from "../pages/Dashboard/Admin/MakeAdmin";
import Forbidden from "../pages/Forbiden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/Dashboard/RiderStatus/AssignRider";

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
        },
        {
          path: "rider",
          element: <PrivateRoute>
            <RiderForm></RiderForm>
          </PrivateRoute>
        },
        {
          path :"forbidden",
          Component: Forbidden
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
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment_history',
        Component: PaymentHistory
      },
      {
        path: "track",
        Component: TrackParcel
      },
      {
        path: 'pendingRider',
        element: <AdminRoute>
          <PendingRider></PendingRider>
        </AdminRoute>
      },
      {
        path: 'activeRider',
        element: <AdminRoute>
          <ActiveRider></ActiveRider>
        </AdminRoute>
      },
      {
        path: 'assignRider',
        element: <AdminRoute>
          <AssignRider></AssignRider>
        </AdminRoute>
      },
      {
        path: 'makeAdmin',
        element: <AdminRoute>
          <MakeAdmin></MakeAdmin>
        </AdminRoute>
      },
    ]
  }
]);