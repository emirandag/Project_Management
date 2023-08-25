import { createContext, useContext, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import jwtDecode from 'jwt-decode';
/**
 * 1.- PRIMERO CREAMOS EL CONTEXTO
 */
const AuthContext = createContext()

/**
 * 2.- CREAMOS LA FUNCION QUE SE PROVEE DEL CONTEXTO
 *      Y QUE GRAPEA LAS PÁGINAS
 */
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const data = sessionStorage.getItem("user")
        const parseUserData = JSON.parse(data)

        if (data) {
            return parseUserData
        } else {
            return null
        }
    })

    // ALLUSER - solo cuando me registro para guardar la respuesta
    const [allUser, setAllUser] = useState({
        data: {
            confirmationCode: "",
            user: {
                password: "",
                email: ""
            }
        }
    })

    

    const getRol = () => {
        const getUser = sessionStorage?.getItem("user")

        if (getUser != null) {
            const decodedToken = jwtDecode(getUser);
            const rol = decodedToken?.rol
            return rol
        } else {
            return null
        }
        
    }
    const navigate = useNavigate()

    /**
     * --------------- LOGIN ------------------
     */
    const userLogin = (data) => {
        // 1.- Meto la data del usuario en el sessionStorage
        sessionStorage.setItem("user", data)

        // 2.- Lo parseamos y lo metemos en el estado global que setea nuestro usuario logado
        const parseUserData = JSON.parse(data)
        setUser(() => parseUserData)
    }

    /**
     * ---------------- LOGOUT -----------------
     */
    const userLogout = () => {
        sessionStorage.removeItem("user")
        setUser(null)
        location.reload();
        navigate("/login")
        
    }

    /**
     *  ---- FUNCIÓN PUENTE PARA CUANDO TENGAMOS PROBLEMAS DE ASINCRONÍA -----
     */
    const bridgeData = (state) => {
        const data = sessionStorage.getItem("data")
        const parseData = JSON.parse(data)

        switch (state) {
            case "ALLUSER":
                setAllUser(parseData)
                sessionStorage.removeItem("data")
                break
            default:
                break
        }
    }

    /**
     * ------ UseMemo memoriza el return de una funcion -------------
     */
    const value = useMemo(() => ({
            user, setUser, userLogin, userLogout, allUser, setAllUser, bridgeData, getRol
        }),
        [user, allUser]
    )
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 

/**
 * 3.- ----- CREAR UN CUSTOM HOOK PARA QUE NOS AYUDE A UTILIZAR EL CONTEXTO -----
 */
export const useAuth = () => {
    return useContext(AuthContext)
}



