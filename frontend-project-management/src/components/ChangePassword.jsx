import "./ChangePassword.css"
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { changePasswordUser } from "../services/API/user.service";
import { useChangePasswordError } from "../hooks";
import { useAuth } from "../context/authContext";
import { FigureUser } from "./FigureUser";
import { Navigate } from "react-router-dom";

export const ChangePassword = () => {
    const { user, setUser, userLogout } = useAuth()
    const { handleSubmit, register } = useForm()
    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)
    const [changePassOk, setChangePassOk] = useState(false)
    /**
     * Función que gestiona los datos del formulario
    */
    const formSubmit = (formData) => {
        const { password, newPassword, confirmPassword } = formData

        // Comprobamos que la contraseña escrita es la misma en los dos campos
        if (newPassword === confirmPassword) {
            Swal.fire({
                title: "Are you sure you want to change your password?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "rgb(73, 193, 162)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm",
              }).then(async (result) => {
                if (result.isConfirmed) {
                    setSend(true)
                    setRes(await changePasswordUser({ password, newPassword }))
                    setSend(false)
                }
              })
        } else {
            Swal.fire({
                icon: "error",
                title: " New Password don't match witch confirmation password❎.",
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }

    /**
     * UseEffect para la gestión de la respuesta y los errores
     */
    useEffect(() => {
        console.log(res);
        useChangePasswordError(res, setRes, setChangePassOk)
    }, [res])

    console.log(user);
    if (changePassOk) {
      // setUser(null)
      // sessionStorage.removeItem("user")
      userLogout()
      return <Navigate to="/login" />
    }

  return (
    <>
          {/* <div className="containerProfile">
        <div className="containerDataNoChange">
          <FigureUser user={user} />
        </div> */}
        
      <div className="form-wrap">
        <h2>Change your password <i className="fa fa-unlock-alt" aria-hidden="true"></i></h2>
        <p>Please, enter your old and new passwords</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="password_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
              Old password
            </label>
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              placeholder="Enter old password"
              {...register("password", { required: true })}
            />
          </div>
          
          <div className="newPassword_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
              New password
            </label>
            <input
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              placeholder="Enter new password"
              {...register("newPassword", { required: true })}
            />
          </div>
          <div className="confirmPassword_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
              Confirm new password
            </label>
            <input
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="false"
              placeholder="Confirm old password"
              {...register("confirmPassword", { required: true })}
            />
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              // style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      </div>
      {/* </div> */}
    </>
  )
}
