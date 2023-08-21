import "./Tasks.css"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTask } from "../services/API/task.service";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCreateTaskError } from "../hooks";
import { useAuth } from "../context/authContext";
import { openProjects } from "../services/API/project.service";


export const NewTasks = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const [res, setRes] = useState({})
    const [resProjects, setResProjects] = useState({});
    const [send, setSend] = useState(false)
    const [confirmTaskOk, setConfirmTaskOk] = useState(false)

    
    const formSubmit = async (formData) => {
      console.log(formData);

      setSend(true)
      setRes(await createTask(formData))
      setSend(false)
        
        
    }

    const loadPage = async () => {
      const dataProject = await openProjects();
      setResProjects(dataProject);
      
    };

    useEffect(() => {
      loadPage();
    }, []);

    useEffect(() => {
        console.log(res);
        useCreateTaskError(res, setRes, setConfirmTaskOk)
    }, [res])


    if (confirmTaskOk) {
      return navigate(`/newtasks/${res?.data?.newTask?._id}`)
    }

  return (
    <>
    <div className="form-wrap-task">
        <span className="span-avatar">
          <img src="https://icons.veryicon.com/png/o/miscellaneous/standard/task-32.png" />
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

                <label htmlFor="projectId">Choose a car:</label>
                <select className="projects-select" {...register("projectId")}>
                  {resProjects?.data?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </select>
          </div>
          <div className="btn_container">
            <button className="btn" type="submit" disabled={send}>
              {send ? "Cargando ..." : "CREATE"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
