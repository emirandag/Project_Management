import "./Projects.css"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createProject } from "../services/API/project.service";
import { useCreateProjectError } from "../hooks/useCreateProjectError";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { addUserProject } from "../services/API/user.service";
import { useAddUserProjectError } from "../hooks";


export const Projects = () => {
    const { register, handleSubmit } = useForm();
    const [res, setRes] = useState({})
    const [resUser, setResUser] = useState({})
    const [send, setSend] = useState(false)
    const { user } = useAuth()
    const [confirmProjectOk, setConfirmProjectOk] = useState(false)
    const [confirmUserProjectOk, setConfirmUserProjectOk] = useState(false)

    const formSubmit = async (formData) => {
        if (user) {

            const newUserId = user._id

            console.log(newUserId);

            const customFormData = {
                ...formData,
                //users: [newUserId],
                owner: newUserId
            }
            setSend(true)
            setRes(await createProject(customFormData))
            //setRes(await addUserProject(customFormData))
            setSend(false)
        }
    }


    useEffect(() => {
        //console.log(res);
        useCreateProjectError(res, setRes, setConfirmProjectOk, setConfirmUserProjectOk)
        //useAddUserProjectError(res, setRes, setConfirmUserProjectOk)
    }, [res])

    if (confirmProjectOk && confirmUserProjectOk) {
      console.log(res);
      return <Navigate to={`/projects/${res.data._id}`} />
      
    }

  return (
    <div className="container">
      <div className="form-wrap-projects">
        <span className="span-avatar">
          <img src="/images/project.png" />
        </span>

        <h1>Create Project</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="projects_container form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
              Title
            </label>
            <input
              className="input_project"
              type="text"
              id="title"
              name="title"
              autoComplete="false"
              placeholder="Enter the title"
              {...register("title", { required: true })}
            />
          </div>
          <div className="projects_container form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
              Description
            </label>
            <input
              className="input_project"
              type="text"
              id="description"
              name="description"
              autoComplete="false"
              placeholder="Enter the description"
              {...register("description", { required: true })}
            />
            </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
            >
              {send ? "Cargando ..." : "CREATE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
