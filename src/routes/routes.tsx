import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signUp",
        element: <SignUp />,
    },
])

export default routes;