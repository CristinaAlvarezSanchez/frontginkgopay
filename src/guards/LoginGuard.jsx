import { Navigate } from "react-router-dom"
import { useLoggedContext } from "../providers/LoggedProvider"

const LoginGuard = ({ children }) => {
    const isLogged = useLoggedContext()
    if (!isLogged) {
        return <Navigate to={'/login'} replace />
    }
    return children
}

export default LoginGuard