import "./CheckCode.css"
import { useAuth } from "../context/authContext"
import { useForm } from "react-hook-form"
import { checkCodeConfirmationUser } from "../services/API/user.service"
import { useEffect, useState } from "react"
import { useAutoLogin, useCheckCodeError } from "../hooks"
import { Navigate } from "react-router-dom"
import { ButtonResend } from "../components"


export const CheckCode = () => {
  const [res, setRes] = useState({})
  const [send, setSend] = useState(false)
  const [checkOk, setCheckOk] = useState(false)
  const [reloadPageError, setReloadPageError] = useState(false)
  const [deleteUser, setDeleteUser] = useState(false)
  const { allUser, userLogin, setUser, user } = useAuth()
  const { register, handleSubmit } = useForm()

  /**
   * Función que gestiona los submit de los formularios
   */
  const formSubmit = async (formData) => {
    //console.log(formData.confirmationCode);
    const userLocal = sessionStorage.getItem("user")
    const parseUser = JSON.parse(userLocal)

    if (userLocal == null) {
      // Este usuario viene del registro por lo que no se ha logueado
      console.log("AllUser -> "+allUser.data.user.email);
      const customFormData = {
        email: allUser.data.user.email,
        confirmationCode: parseInt(formData.confirmationCode)
      }

      // Llamada al servicio
      setSend(true)
      setRes(await checkCodeConfirmationUser(customFormData))
      setSend(false)
    } else {
      // Este usuario viene del login, porque existe en el sessionStorage
      console.log(userLocal);
      const customFormData = {
        email: parseUser.email,
        confirmationCode: parseInt(formData.confirmationCode)
      }

      // Llamada al servicio
      setSend(true)
      setRes(await checkCodeConfirmationUser(customFormData))
      setSend(false)
    }
  }

  /**
   * 2.- UseEffect que gestiona los errores y las respuestas
   */
  useEffect(() => {
    useCheckCodeError(res, setDeleteUser, setCheckOk, setUser, setReloadPageError, setRes)
  }, [res])

  /**
   * Estados de navegación o de confirmación de funcionalidades
   */
  if (checkOk) {
    // if (!sessionStorage.getItem("user")) {
    //   //autologin
    //   setCheckOk(() => false)
    //   useAutoLogin(allUser, userLogin, setCheckOk);
    // } else {
    //   return <Navigate to="/dashboard" />
    // }
    return <Navigate to="/login" />
  }

  if (deleteUser) {
    return <Navigate to="/register" />
  }

  if (reloadPageError) {
    return <Navigate to="/login" />
  }
  

  return (
    <>
    <div className="form-wrap-check">
      <h1>Verify your code</h1>
      <p>Write the code sent to your email</p>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="user_container form-group">
        <label htmlFor="custom-input" className="custom-placeholder">
            Registration code
          </label>
          <input
            className="input_user"
            type="text"
            id="name"
            name="name"
            autoComplete="false"
            {...register("confirmationCode", { required: false })}
          />
          
        </div>
        <div className="btn_container">
          <button
            id="btnCheck"
            className="btn"
            type="submit"
            disabled={send}
            // style={{ background: send ? "#49c1a388" : "#49c1a2" }}
          >
            Verify Code
          </button>
        </div>
      </form>
      <div className="btn_container">
        <ButtonResend setReloadPageError={setReloadPageError} />
      </div>
      <p className="bottom-text">
        <small>
          If the code is not correct ❌, your user will be deleted from the
          database and you will need to register again.{" "}
        </small>
      </p>
    </div>
  </>
  )
}