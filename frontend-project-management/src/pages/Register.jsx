import "./Register.css"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { registerUser } from "../services/API/user.service";
import { Link, Navigate } from "react-router-dom";
import { useRegisterError } from "../hooks";
import { useAuth } from "../context/authContext";
import { Uploadfile } from "../components";

export const Register = () => {
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [registerOk, setRegisterOk] = useState(false);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    if (inputFile.length !== 0) {
      // Cuando hayan puesto una imagen por el input

      const customFormData = {
        ...formData,
        photo: inputFile[0],
      };
      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);

      // llamo al servicio
    } else {
      const customFormData = {
        ...formData,
      };

      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);
    }
  };

  useEffect(() => {
    //console.log(res);
    useRegisterError(res, setRegisterOk, setRes, setAllUser);
    if (res?.status == 201) bridgeData("ALLUSER");
  }, [res]);

  /**
   * -------- Estados de navegación ---------
   */
  if (registerOk) {
    return <Navigate to="/checkCode" />;
  }

  return (
    <>
      
        <div className="form-wrap-register">
          <span className="span-avatar">
            <img src="/images/login_avatar_white.png" />
          </span>

          <h2>Sign up</h2>
          
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
                autoComplete="off"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && <span className='form-required'>* This field is required</span>}
            </div>
            <div className="user_container form-group">
              <label htmlFor="custom-input" className="custom-placeholder">
                Email
              </label>
              <input
                className="input_user"
                type="text"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && <span className='form-required'>* This field is required</span>}
            </div>
            <div className="password_container form-group">
              <label htmlFor="custom-input" className="custom-placeholder">
                Password
              </label>
              <input
                className="input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && <span className='form-required'>* This field is required</span>}
            </div>
            <div className="input_sexo">
              <div className="input_sexo_male">
                <input
                  type="radio"
                  name="sexo"
                  id="male"
                  value="male"
                  defaultChecked
                  {...register("gender")}
                />
                <label htmlFor="male" className="label-radio hombre">
                  Hombre
                </label>
              </div>
              <div className="input_sexo_female">
                <input
                  type="radio"
                  name="sexo"
                  id="female"
                  value="female"
                  {...register("gender")}
                />
                <label htmlFor="female" className="label-radio mujer">
                  Mujer
                </label>
              </div>
            </div>
            <div className="input_rol">
              <div className="input_rol_admin">
                <input
                  type="radio"
                  name="rol"
                  id="admin"
                  value="admin"
                  disabled
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
                  disabled
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
            <Uploadfile />
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                // style={{ background: send ? "#478ac9" : "#478ac9" }}
              >
                {send ? "Cargando ....." : "REGISTER"}
              </button>
            </div>
            <div className="footerForm">
              <Link to="/login">Already have an account?</Link>

            </div>
          </form>
        </div>
    </>
  );
};
