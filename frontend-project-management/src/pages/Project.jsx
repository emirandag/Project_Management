import { useState } from "react";
import "./Project.css"
import { Navigate, useParams } from "react-router-dom";
import Modal from "../components/UI/Modal/Modal";
import { useDeleteProjectError, useUpdateProjectError } from "../hooks";



export const Project = () => {
    const { id } = useParams();
    const [renderPageAddMember, setRenderPageAddMember] = useState(false);
    const [renderPageTask, setRenderTask] = useState(false);
    const [deleteProjectOk, setDeleteProjectOk] = useState(false)
    const [updateProjectOk, setUpdateProjectOk] = useState(false)

    if (renderPageAddMember) {
        return <Navigate to={`/projects/${id}/addmember`} />
    }
    if (renderPageTask) {
      return <Navigate to={`/projects/${id}/tasks`} />
    } 
    if (deleteProjectOk) {
      return <Navigate to={`/dashboard`} />
    }

  return (
    <>
      <div className="project-container">
        <div className="project-top">
          <span>
            <img src="j" alt="avatar" />
          </span>
          <h2>Project Title</h2>
          <button disabled={updateProjectOk} onClick={() => useUpdateProjectError(id, setUpdateProjectOk)}>Close Project</button>
        </div>
        <div className="project-middle">
          <div className="project-middle-left">
            <button onClick={() => setRenderPageAddMember(true)}>Add member</button>
            {/* {render && (
              <Modal>
                <h1>Esto es una prueba del modal</h1>
                <h3>Add Member</h3>
                <button onClick={() => setRender(false)}>X</button>
                <input type="text" placeholder="Enter email member"/>
              </Modal>
            )} */}
            <button onClick={() => setRenderTask(true)}>Add task</button>
          </div>
          <div className="project-middle-right">
            <button onClick={() => useDeleteProjectError(id, setDeleteProjectOk)}>Delete project</button>
          </div>
        </div>
        <div className="project-container-tasks">
          <div>Task title</div>
        </div>
      </div>
    </>
  );
}
