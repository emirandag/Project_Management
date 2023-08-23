import "./FormProfile.css"
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext"
import { useEffect, useState } from "react"
import { updateUser } from "../services/API/user.service";
import { useUpdateUserError } from "../hooks";
import { Uploadfile } from "./Uploadfile";
import { FigureUser } from "./FigureUser";

export const FormProfile = () => {
  const { user, setUser, logout } = useAuth()
  const { register, handleSubmit } = useForm()
  const [res, setRes] = useState({})
  const [send, setSend] = useState(false)

  const defaultData = {
    name: user?.user
  }

  /**
   * Función que gestiona el formulario
   */
  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;
        console.log(inputFile.length);
        let customFormData

        if (inputFile.length !== 0) {
          customFormData = {
            ...formData,
            photo: inputFile[0]
          }
          setSend(true)
          setRes(await updateUser(customFormData))
          setSend(false)
        } else {
          customFormData = {
            ...formData
          }
          setSend(true)
          setRes(await updateUser(customFormData))
          setSend(false)
        }
      }
    })
  }

  /**
   * UseEffect que gestiona la respuesta y los errores
   */
  useEffect(() => {
    console.log(res);
    useUpdateUserError(res,setRes, setUser)
  }, [res])

  return (
    <>
      {/* <div className="containerProfile">
        <div className="containerDataNoChange">
          <FigureUser user={user} />
        </div> */}
        <div className="form-wrap formProfile">
          <h2>Change your data profile <i className="fa fa-user" aria-hidden="true"></i></h2>
          <p>Please, enter your new data profile</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
              Name
              </label>
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                defaultValue={defaultData?.name}
                {...register("name")}
              />

            </div>
            <Uploadfile />
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                // style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              >
                CHANGE DATA PROFILE
              </button>
            </div>
          </form>
        </div>
      {/* </div> */}
    </>
  )
}
