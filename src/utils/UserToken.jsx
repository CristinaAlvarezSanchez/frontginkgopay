import jwtDecode from "jwt-decode"
import { useLocalStorage } from "react-use"

const UserGuard = () => {
    const [token] = useLocalStorage('token')
    const decodeToken = jwtDecode(token)
    return decodeToken
}

export default UserGuard
