import "./ForgotPassword.css"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { forgotPasswordUser } from "../services/API/user.service"
import { useForgotPassword } from "../hooks"


export const ForgotPassword = () => {
    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)
    const { handleSubmit, register } = useForm()
    const [forgotOk, setForgotOk] = useState(false)

    /**
     * Función que gestiona los datos del formulario
     */
    const formSubmit = async (formData) => {
        setSend(true)
        setRes(await forgotPasswordUser(formData))
        setSend(false)
    }

    /**
     * UseEffect que gestiona las respuestas y los errores
     */
    useEffect(() => {
console.log(res);
        useForgotPassword(res, setRes, setForgotOk)
    }, [res])

    /**
     * Estados de navegación o de funcionalidades OK
     */
    if (forgotOk) {
        return <Navigate to="/login" />
    }
    

  return (
    <>
      <div className="form-wrap">
        <h1>Change your password 💱</h1>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Change password
            </button>
          </div>

          <p className="bottom-text">
            <small>Enter your email to send you the new password 💌</small>
          </p>
        </form>
      </div>
    </>
  )
}
