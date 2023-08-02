import { useEffect, useState } from "react";
import "./Project.css"
import { Navigate, useParams } from "react-router-dom";
import Modal from "../components/UI/Modal/Modal";
import { useDeleteProjectError, useUpdateProjectError } from "../hooks";
import { showProjectById } from "../services/API/project.service";



export const Project = () => {
    const { id } = useParams();
    const [res, setRes] = useState({})
    const [renderPageAddMember, setRenderPageAddMember] = useState(false);
    const [renderPageTask, setRenderTask] = useState(false);
    const [deleteProjectOk, setDeleteProjectOk] = useState(false)
    const [updateProjectOk, setUpdateProjectOk] = useState(false)

    console.log(id);
    const loadPage = async (id) => {
      const dataProject = await showProjectById(id)
      setRes(dataProject)
    }
  
    useEffect(() => {
      loadPage(id)
      //console.log(res);
    }, [])
    console.log(res);

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
        
      {res ? (
        <>
        <div className="project-top">
          <span>
            <img src="data:image/jpeg;base64,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" alt="owner" />
          </span>
          <h2>{res?.data?.title}</h2>
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
          <div className="project-task">
            <h3>Task title</h3>
            <div>
              <span>User</span>
              <span>Estado</span>
            </div>
          </div>
        </div>
        </>
      ) : (<h1>Loading ...</h1>)}
      
      </div>
    </>
  );
}
