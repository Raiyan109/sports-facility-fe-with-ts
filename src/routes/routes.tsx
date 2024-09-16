import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import Home from "@/pages/Home";
import About from "@/pages/otherPages/About";
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
    // {
    //   path: "/wishListPage",
    //   element: <WishlistPage />,
    // },
    // {
    //   path: "/all-facilities-list",
    //   element: <ProtectedRoute>
    //     <AllFacilitiesList />
    //   </ProtectedRoute>
    // },
    // {
    //   path: "/all-facilities-list/:id",
    //   element: <ProtectedRoute>
    //     <FacilityDetails />
    //   </ProtectedRoute>
    // },
    // {
    //   path: "/my-bookings/:id",
    //   element: <BookingDetails />
    // },
    // {
    //   path: "/availability-checking/:id",
    //   element: <AvailabilityChecking />,
    // },
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
    // {
    //   path: "/contact",
    //   element: <Contact />,
    // },
    // {
    //   path: "/forgot-password",
    //   element: <ForgotPassword />,
    // },
    // {
    //   path: "admin-dashboard",
    //   element: <AdminDashboard />,
    //   children: [
    //     {
    //       path: "/admin-dashboard",
    //       element: <AdminWelcome />,
    //     },
    //     {
    //       path: "facilities-table",
    //       element: <FacilitiesTable />,
    //     },
    //     {
    //       path: "create-facility",
    //       element: <CreateFacility />,
    //     },
    //     {
    //       path: "all-bookings",
    //       element: <AllBookings />,
    //     },
    //     {
    //       path: "make-admin",
    //       element: <MakeAdmin />,
    //     },
    //   ]
    // },
    // {
    //   path: "user-dashboard",
    //   element: <UserDashboard />,
    //   children: [
    //     {
    //       path: "/user-dashboard",
    //       element: <UserWelcome />,
    //     },
    //     {
    //       path: "my-bookings",
    //       element: <UserBookings />,
    //     },
    //     {
    //       path: "create-booking",
    //       element: <CreateBooking />,
    //     },
    //   ]
    // },
]);


export default routes;