import "./ChangeRol.css"
import { useForm } from "react-hook-form";

import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { changeRol } from "../services/API/user.service";
import { useChangeRolError } from "../hooks";

export const ChangeRol = () => {
    const { register, handleSubmit } = useForm();
    const [resUser, setResUSer] = useState({});
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    const [changeRolOk, setChangeRolOk] = useState(false);

    const handleSearchUser = async () => {
        send(true)
        setResUSer()
    }

    const formSubmit = async (formData) => {
        setSend(true)
        setRes(await changeRol(formData))
        setSend(false)
    }

    useEffect(() => {
        useChangeRolError(res, setRes, setChangeRolOk)
    }, [res])

  return (
    <div className='change-rol-container'>
        
        <div className='change-rol-form'>
        <span className="span-avatar">
          <img src="https://cdn-icons-png.flaticon.com/512/584/584594.png" />
        </span>
        <h1>Change rol</h1>
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
          </div>
          <div className="input_rol">
              <div className="input_rol_admin">
                <input
                  type="radio"
                  name="rol"
                  id="admin"
                  value="admin"
                  {...register("rol")}
                />
                <label htmlFor="admin" className="label-radio admin">
                  Admin
                </label>
              </div>
              <div className="input_rol_manager">
                <input
                  type="radio"
                  name="rol"
                  id="manager"
                  value="manager"
                  {...register("rol")}
                />
                <label htmlFor="manager" className="label-radio manager">
                  Manager
                </label>
              </div>
              <div className="input_rol_user">
                <input
                  type="radio"
                  name="rol"
                  id="user"
                  value="user"
                  defaultChecked
                  {...register("rol")}
                />
                <label htmlFor="user" className="label-radio user">
                  User
                </label>
              </div>
            </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
            >
              Change rol
            </button>
          </div>
            </form>
        </div>
    </div>
  )
}
