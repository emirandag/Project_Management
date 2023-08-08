import { useEffect, useState } from "react";
import "./Project.css"
import { Navigate, useParams } from "react-router-dom";
import Modal from "../components/UI/Modal/Modal";
import { useDeleteProjectError, useDeleteTaskError, useUpdateProjectError } from "../hooks";
import { showProjectById } from "../services/API/project.service";
import { useAuth } from "../context/authContext";



export const Project = () => {
    const { id } = useParams();
    const { user } = useAuth()
    const [res, setRes] = useState({})
    const [renderPageAddMember, setRenderPageAddMember] = useState(false);
    const [renderPageTask, setRenderTask] = useState(false);
    const [deleteProjectOk, setDeleteProjectOk] = useState(false)
    const [updateProjectOk, setUpdateProjectOk] = useState(false)
    const [deleteTaskOk, setDeleteTaskOk] = useState(false)

    console.log(id);
    const loadPage = async (id) => {
      const dataProject = await showProjectById(id)
      setRes(dataProject)
    }
  
    useEffect(() => {
      loadPage(id)
      //console.log(res);
    }, [deleteTaskOk, updateProjectOk])
    console.log(res);

    if (renderPageAddMember) {
        return <Navigate to={`/projects/${id}/addmember`}/>
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
              <div className="project-avatar">

              
              {res?.data?.users?.map(
              (user) =>
                user._id.includes(res?.data?.owner) ? (
                  <img 
                  className="avatar-owner"
                  src={user.photo}
                  alt={user.name}
                  key={user._id}
                />
                  

                ) : (              
                <img
                  src={user.photo}
                  alt={user.name}
                  key={user._id}
                />
 
                )
              )}
              </div>
              <h2>{res?.data?.title}</h2>
              <button
              disabled={res?.data?.isClosed == true}
              onClick={() => useUpdateProjectError(id, setUpdateProjectOk)}
            >
              {res?.data?.isClosed ? "Closed" : "Close Project"}
              </button>
              
                
            </div>
            <div className="project-middle">
              <div className="project-middle-left">
                <button onClick={() => setRenderPageAddMember(true)}>
                  Add member
                </button>
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
                <button 
                  onClick={() => useDeleteProjectError(id, setDeleteProjectOk)}
                >
                  Delete project
                </button>
              </div>
            </div>
            <div className="project-container-tasks">
              {res?.data?.tasks?.map((task) => (
                <div className="project-task" key={task._id}>
                  <h3>{task.title}</h3>
                  <div>
                    <span>{task?.assignedTo == user._id && user.email}</span>
                    <span>{task?.isCompleted ? "Completada" : "Abierta"}</span>
                    <button onClick={() => useDeleteTaskError(task._id, setDeleteTaskOk)}>Delete task</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
    </>
  );
}
