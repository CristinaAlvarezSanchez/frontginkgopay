import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "react-use"

const LoggedContext = createContext(null)
const SetLoggedContext = createContext(null)
const SetRoleContext = createContext(null)

export const useLoggedContext = () => {
    return useContext(LoggedContext)
}

export const useSetLoggedContext = () => {
    return useContext(SetLoggedContext)
}

export const useSetRoleContext = () => {
    return useContext(SetRoleContext)
}

const LoggedProvider = ({ children }) => {

    const [token] = useLocalStorage('token')
    const [isLogged, setIsLogged] = useState(token ? true : false);

    return (

        <LoggedContext.Provider value={isLogged}>
            <SetLoggedContext.Provider value={setIsLogged}>
                {children}
            </SetLoggedContext.Provider>
        </LoggedContext.Provider >
    )
}

export default LoggedProvider