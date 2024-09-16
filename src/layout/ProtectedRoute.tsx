import { useSelector } from "react-redux"
import { useCurrentToken } from "../redux/features/auth/authSlice"
import { Navigate } from "react-router-dom"
import { ReactNode } from "react"


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useSelector(useCurrentToken)
    if (!token) {
        return <Navigate to='/login' replace={true} />
    }
    return children
}

export default ProtectedRoute