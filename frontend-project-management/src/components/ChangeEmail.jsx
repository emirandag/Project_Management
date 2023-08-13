
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useForm } from 'react-hook-form'

export const ChangeEmail = () => {
    const { user, setUser, logout } = useAuth()
    const { handleSubmit, register } = useForm()
    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)

    const formSubmit = (formData) => {

    }
    
  return (
    <div className="form-wrap">
        <h1>Change your email <i className="fa fa-envelope" aria-hidden="true"></i></h1>
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
      </div>
  )
}
