import AdminDashboard from "@/layout/admin/AdminDashboard";
import AdminWelcome from "@/layout/admin/AdminWelcome";
import AllBookings from "@/layout/admin/AllBookings";
import CreateFacility from "@/layout/admin/CreateFacility";
import FacilitiesTable from "@/layout/admin/FacilitiesTable";
import MakeAdmin from "@/layout/admin/MakeAdmin";
import ProtectedRoute from "@/layout/ProtectedRoute";
import CreateBooking from "@/layout/user/CreateBooking";
import UserBookings from "@/layout/user/UserBookings";
import UserDashboard from "@/layout/user/UserDashboard";
import UserWelcome from "@/layout/user/UserWelcome";
import AllFacilitiesList from "@/pages/allFacilitiesList/AllFacilitiesList";
import FacilityDetails from "@/pages/allFacilitiesList/FaciltyDetails";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import AvailabilityChecking from "@/pages/availability/AvailabilityChecking";
import BookingDetails from "@/pages/bookings/BookingDetails";
import Home from "@/pages/Home";
import About from "@/pages/otherPages/About";
import Contact from "@/pages/otherPages/Contact";
import WishlistPage from "@/pages/wishlist/WishlistPage";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    // {
    //   path: "/facilities",
    //   element: <Facilities />,
    // },
    {
        path: "/wishListPage",
        element: <WishlistPage />,
    },
    {
        path: "/all-facilities-list",
        element: <ProtectedRoute>
            <AllFacilitiesList />
        </ProtectedRoute>
    },
    {
        path: "/all-facilities-list/:id",
        element: <ProtectedRoute>
            <FacilityDetails />
        </ProtectedRoute>
    },
    {
        path: "/my-bookings/:id",
        element: <BookingDetails />
    },
    {
        path: "/availability-checking/:id",
        element: <AvailabilityChecking />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signUp",
        element: <SignUp />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    // {
    //   path: "/forgot-password",
    //   element: <ForgotPassword />,
    // },
    {
        path: "admin-dashboard",
        element: <AdminDashboard />,
        children: [
            {
                path: "/admin-dashboard",
                element: <AdminWelcome />,
            },
            {
                path: "facilities-table",
                element: <FacilitiesTable />,
            },
            {
                path: "create-facility",
                element: <CreateFacility />,
            },
            {
                path: "all-bookings",
                element: <AllBookings />,
            },
            {
                path: "make-admin",
                element: <MakeAdmin />,
            },
        ]
    },
    {
        path: "user-dashboard",
        element: <UserDashboard />,
        children: [
            {
                path: "/user-dashboard",
                element: <UserWelcome />,
            },
            {
                path: "my-bookings",
                element: <UserBookings />,
            },
            {
                path: "create-booking",
                element: <CreateBooking />,
            },
        ]
    },
]);


export default routes;