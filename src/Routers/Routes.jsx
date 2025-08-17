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
import Announcements from "../Pages/Announcements/Announcements";
import UsersRoute from "../Routes/UsersRoute";
import Loading1 from "../Pages/Loadings/Loading1";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import AdminRoute from "../Routes/AdminRoute";
import UsersList from "../Pages/UsersList/UsersList";
import ManageMembers from "../Pages/ManageMembers/ManageMembers";
import AgreementReq from "../Pages/AgreementReq/AgreementReq";
import MakeAnnouncement from "../Pages/MakeAnnouncement/MakeAnnouncement";
import ManageCoupons from "../Pages/ManageCoupons/ManageCoupons";
import MemberRoute from "../Routes/MemberRoute";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import ContactUs from "../Pages/ContactUs/ContactUs";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "../Pages/Terms/Terms";
import AllCoupons from "../Pages/AllCoupons/AllCoupons";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import AboutUs from "../Pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "apartment",
        Component: ApartmentsContainer,
        loader: () =>
          axios.get("https://arc-lane-server.vercel.app/countApartments"),
        hydrateFallbackElement: <Loading1></Loading1>,
      },
      {
        path: "forbidden",
        Component: ForbiddenPage,
      },
      {
        path: "contactUs",
        Component: ContactUs,
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "terms-conditions",
        Component: Terms,
      },
      {
        path: "allCoupons",
        Component: AllCoupons,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "about-us",
        Component: AboutUs,
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
      // user route TODO: make member route
      {
        path: "payment",

        element: (
          <MemberRoute>
            <MakePayment></MakePayment>
          </MemberRoute>
        ),
      },
      {
        path: "paymentPage",

        element: (
          <MemberRoute>
            <PaymentPage></PaymentPage>
          </MemberRoute>
        ),
      },

      {
        path: "payment-history",
        element: (
          <MemberRoute>
            <PaymentHistory></PaymentHistory>
          </MemberRoute>
        ),
      },
      // user & member route
      {
        path: "userProfile",
        element: (
          <UsersRoute>
            <UserProfile></UserProfile>
          </UsersRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <UsersRoute>
            <Announcements></Announcements>
          </UsersRoute>
        ),
        loader: () =>
          axios.get("https://arc-lane-server.vercel.app/countAnnouncements"),
        hydrateFallbackElement: <Loading1></Loading1>,
      },

      // admin routes
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UsersList></UsersList>
          </AdminRoute>
        ),
        loader: () =>
          axios.get("https://arc-lane-server.vercel.app/countUsers"),
        hydrateFallbackElement: <Loading1></Loading1>,
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <ManageMembers></ManageMembers>
          </AdminRoute>
        ),
        loader: () =>
          axios.get(
            "https://arc-lane-server.vercel.app/countUsers?memberReq=memberReq"
          ),
        hydrateFallbackElement: <Loading1></Loading1>,
      },
      {
        path: "agreement-requests",
        element: (
          <AdminRoute>
            <AgreementReq></AgreementReq>
          </AdminRoute>
        ),
      },
      {
        path: "make-announcements",
        element: (
          <AdminRoute>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons></ManageCoupons>
          </AdminRoute>
        ),
      },
    ],
  },
]);
