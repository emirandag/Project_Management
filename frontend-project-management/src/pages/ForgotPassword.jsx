import "./ForgotPassword.css"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { forgotPasswordUser } from "../services/API/user.service"
import { useForgotPassword } from "../hooks"


export const ForgotPassword = () => {
    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)
    const { handleSubmit, register, formState: { errors } } = useForm()
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
    <div className="container">
      <div className="form-wrap-password">
        <span className="span-avatar">
            <img src="/images/reset_password.png" />
          </span>
        <h1>Change your password</h1>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>
            <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            {errors.email && <span className='form-required'>* This field is required</span>}
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
            >
              Change password
            </button>
          </div>

          <p className="bottom-text">
            <small>Enter your email to send you the new password 💌</small>
          </p>
        </form>
      </div>
    </div>
  )
}
