import jwtDecode from "jwt-decode"
import { useLocalStorage } from "react-use"

const UserToken = () => {
    const [token] = useLocalStorage('token')
    if (token) {
        const decodeToken = jwtDecode(token)
        return decodeToken
    }
    else { return {} }
}

export default UserToken
