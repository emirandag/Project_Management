import { useState, useEffect } from "react"
import { useAuth } from "../context/authContext"
import { resendCodeConfirmationUser } from "../services/API/user.service"
import { useResendCode } from "../hooks"


export const ButtonResend = ({ setReloadPageError }) => {
    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)
    const { allUser, user } = useAuth()

    /**
     * Las funciones que gestionan los submit de los formularios
     */
    const handleReSend = async () => {
        // No tenemos un formData porque sacamos la info por la parte del AllUser
        // o del sessionStorage
        const getEmailsessionStorage = () => {
            const userLocal = sessionStorage.getItem("user")
            const parseUserLocal = JSON.parse(userLocal)

            return parseUserLocal.email
        }

        setSend(true)
        setRes(await resendCodeConfirmationUser({
            email: sessionStorage.getItem("user") ? getEmailsessionStorage() : allUser?.data?.user?.email
        }))
        setSend(false)
    }

    /**
     * UseEffect que gestiona los errores y las respuestas
     */
    useEffect(() => {
        console.log(res)

        useResendCode(res, setReloadPageError, setRes)
    }, [res])
    

  return (
    <button 
        id="btnResend" 
        className="btn" 
        disabled={send} 
        // style={{ background: send ? "#49c1a388" : "#49c1a2" }} 
        onClick={() => handleReSend()}
    >
        Resend Code
    </button>
  )
}
