import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import Dashboard from "../Layouts/DashBoardLayout/DashBoardLayout";
import DashBoardHome from "../Pages/DashBoardHome/DashBoardHome";
import PrivateRoute from "../Routes/PrivateRoute";
import MakePayment from "../Pages/MakePayment/MakePayment";
import PaymentPage from "../Pages/MakePayment/PaymentPage";
import ApartmentsContainer from "../Pages/Apartment/ApartmentsContainer/ApartmentsContainer";
import axios from "axios";
import ForbiddenPage from "../Pages/ForbiddenPage/ForbiddenPage";
import UserProfile from "../Pages/UserProfile/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "appartment",
        Component: ApartmentsContainer,
        loader: () => axios.get("http://localhost:3000/countApartments"),
      },
      {
        path: "forbidden",
        Component: ForbiddenPage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashBoardHome,
      },
      // user route TODO: make user route
      {
        path: "payment",
        Component: MakePayment,
      },
      {
        path: "paymentPage",
        Component: PaymentPage,
      },
      {
        path: "userProfile",
        Component: UserProfile,
      },
    ],
  },
]);
