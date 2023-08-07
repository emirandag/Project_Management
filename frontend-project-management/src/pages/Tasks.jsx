import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTask } from "../services/API/task.service";
import { Navigate, useParams } from "react-router-dom";
import { useCreateTaskError } from "../hooks";


export const Tasks = () => {
    const { id } = useParams()
    const { register, handleSubmit } = useForm();
    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)
    const [confirmTaskOk, setConfirmTaskOk] = useState(false)

    //console.log(id);
    const formSubmit = async (formData) => {
      
        const projectId = id
        const customFormData = {
            ...formData,
            projectId
        }
        setSend(true)
        setRes(await createTask(customFormData))
        setSend(false)
    }

    useEffect(() => {
        console.log(res);
        useCreateTaskError(res, setRes, setConfirmTaskOk)
    }, [res])


    if (confirmTaskOk) {
      return <Navigate to={`/projects/${id}/tasks/${res?.data?.newTask?._id}`} />
    }

  return (
<>
      <div className="form-wrap-register">
        <span className="span-avatar">
          <img src="/images/login_avatar_white.png" />
        </span>

        <h1>Create Task</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="project_container form-group">
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
          {/* <div className="project_container form-group">
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
            </div> */}
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
    </>
  );
}
