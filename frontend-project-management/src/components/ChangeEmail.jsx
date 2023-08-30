
import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { useForm } from 'react-hook-form'
import { changeEmail, checkNewEmail } from '../services/API/user.service'
import { useChangeEmailError } from '../hooks'
import { useValidateEmailError } from '../hooks/useValidateEmailError'
import { Navigate } from 'react-router-dom'
import { Profile } from '../pages/Profile'

export const ChangeEmail = () => {
    const { user, setUser, userLogin, userLogout } = useAuth()
    const { handleSubmit, register, reset } = useForm()
    const [res, setRes] = useState({})
    const [resCheck, setResCheck] = useState({})
    const [send, setSend] = useState(false)
    const [changeEmailOk, setChangeEmailOk] = useState(false)
    const [validateEmailOk, setValidateEmailOk] = useState(false)

    const formSubmit = async (formData) => {
      setSend(true)
      setRes(await changeEmail(formData))
      setSend(false)
    }

    const formValidate = async (formData) => {
      setSend(true)
      setResCheck(await checkNewEmail(formData))
      setSend(false)
    }

    useEffect(() => {
      useChangeEmailError(res, setRes, setChangeEmailOk)
      reset()
    }, [res])

    useEffect(() => {
      useValidateEmailError(resCheck, setResCheck, setValidateEmailOk, user, userLogin)
    }, [resCheck])

    //console.log(resCheck);
    if (validateEmailOk) {
      setResCheck({})
      userLogout()
return <Navigate to={"/login"} />
    }
    
  return (
    <div className="form-wrap">
        
        {!changeEmailOk ? (
          <>
          <h2>Change your email <i className="fa fa-envelope" aria-hidden="true"></i></h2>
        <p>Please, enter your old and new passwords</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
              Old email
            </label>
            <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              autoComplete="false"
              placeholder="Enter old email"
              defaultValue={user?.email}
              {...register("email", { required: true })}
            />
          </div>
          
          <div className="newEmail_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
              New email
            </label>
            <input
              className="input_user"
              type="text"
              id="newEmail"
              name="newEmail"
              autoComplete="false"
              placeholder="Enter new email"
              {...register("newEmail", { required: true })}
            />
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              // style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              CHANGE EMAIL
            </button>
          </div>
        </form>
        </>
) : (
  <>
  <h2>Validate your email and code <i className="fa fa-envelope" aria-hidden="true"></i></h2>
        <p>Please, enter your confirmation code</p>
        <i className="fa fa-envelope-open" aria-hidden="true"></i>
        <form onSubmit={handleSubmit(formValidate)}>
          <div className="newEmail_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
            New email
            </label>
            <input
              className="input_user"
              type="text"
              id="newEmail"
              name="newEmail"
              autoComplete="false"
              placeholder="Enter new email"
              {...register("newEmail", { required: true })}
            />
          </div>
          
          <div className="confirmationCode_container form-group">
          <label htmlFor="custom-input" className="custom-placeholder">
              Confirmation Code
            </label>
            <input
              className="input_user"
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              autoComplete="false"
              placeholder="Enter your confirmation code"
              {...register("confirmationCode", { required: true })}
            />
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              // style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              CHANGE EMAIL
            </button>
          </div>
        </form>
        </>
        )
        }
      </div>
  )
}
