import './Login.css'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useLoginError } from '../hooks';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../services/API/user.service';
import { useAuth } from '../context/authContext';

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [loginOk, setLoginOk] = useState(false);
  const { userLogin, setUser } = useAuth();

  /**
   * 1.- Función que gestiona el formulario
   */
  const formSubmit = async (formData) => {
    //console.log(formData);
    setSend(true);
    setRes(await loginUser(formData));
    setSend(false);
  };

  /**
   * 2.- UseEffects que gestionan las respuestas y los errores
   */
  useEffect(() => {
    setUser(() => null);
  }, []);

  useEffect(() => {
    //console.log("Respuesta: "+res);
    useLoginError(res, setLoginOk, userLogin, setRes);
  }, [res]);

  /**
   * 3.- Estados de navegación o estados de funcionalidades OK
   */
  if (loginOk) {
    if (res.data.user.check == false) {
      return <Navigate to="/checkCode" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  return (
    <>
      <div className="form-wrap-login">
        <span className="span-avatar">
          <img src="/images/login_avatar_white.png" />
        </span>

        <h1>Sign in</h1>
        {/* <p>It's free and only takes a minute.</p> */}
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
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
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
              autoComplete="false"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              // style={{ background: send ? "#478ac9" : "#478ac9" }}
            >
              {send ? "Cargando ....." : "LOGIN"}
            </button>
          </div>
          <div className="footerForm">
            <Link to="/register">Don't have an account</Link>
            <Link to="/forgotpassword" className="anchorCustom">
              Forgot password?
            </Link>
            {/* <small>

              Have you forgotten the password?
              <Link to="/forgotpassword" className="anchorCustom">
                Change password
              </Link>
            </small> */}
          </div>
        </form>
      </div>
      {/* <div className="footerForm">
        <p className="parrafoLogin"> */}
      {/* Are you not registered? <Link to="/register">Register Here</Link> */}
      {/* <Link to="/register">Register Here</Link> 
        </p> */}
      {/* </div> */}
    </>
  );
}
