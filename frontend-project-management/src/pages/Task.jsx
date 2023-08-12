import "./Task.css"
import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { addUserTask, showTaskById } from "../services/API/task.service";
import { useAddUserTaskError, useDeleteTaskError, useUpdateTaskError } from "../hooks";
import { useAuth } from "../context/authContext";


export const Task = () => {
    const { id } = useParams();
    const { user } = useAuth()
    const [res, setRes] = useState({})
    const [updateTaskOk, setUpdateTaskOk] = useState(false)
    const [deleteTaskOk, setDeleteTaskOk] = useState(false)
    const [addUserOk, setAddUserOk] = useState(false)

    const location = useLocation();
    const projectTitle = location?.state
    // if (location.pathname == "/tasks") {
      
    // } else {
    //   const projectTitle = location?.state?.title
    //   return projectTitle
    // }
    
    console.log(location);

    const loadPage = async (id) => {
        // console.log(id);
        const data = await showTaskById(id)
        setRes(data)
      }
    
      useEffect(() => {
        loadPage(id)
      }, [updateTaskOk, addUserOk])


      if (deleteTaskOk) {
        return <Navigate to={`/projects/${res?.data?.project}`} />
      }
    //   if (updateTaskOk) {
    //     loadPage(id)
    //     setUpdateTaskOk(false)
    //   }

    //   if (addUser) {
    //     loadPage(id)
    //     setAddUser(false)
    //   }


  return (
    <>
    <div className="task-dashboard">
      {console.log(projectTitle)}
    <h2>{projectTitle}</h2>
      <div className="task-container">
        {res ? (
          <>
            <div className="task-top">
              <div className="task-avatar">
                {res?.data?.assignedTo ? (
                    <>
                  <img
                    className="avatar-user"
                    src={user.photo}
                    alt={user.name}
                    key={user._id}
                  />
                  <h4>{user.email}</h4>
                  </>
                ) : (
                  <button 
                  disabled={res?.data?.isCompleted}
                    onClick={() => useAddUserTaskError(id, user?.email, setAddUserOk)}
                    // onClick={() => useUpdateTaskError(id, setUpdateTaskOk)}
                  >
                    Assigned to me
                  </button>
                )}
              </div>
              <button 
              disabled={res?.data?.isCompleted}
              onClick={() => useDeleteTaskError(id, setDeleteTaskOk)}>Delete task</button>
              {res?.data?.isCompleted == false ? (
              <button
                onClick={() => useUpdateTaskError(id, setUpdateTaskOk)}
              >
                Complete Task
              </button>
              ) : (
                <button
                disabled
              >
                Completed
              </button>
              )
                }
            </div>
            <div className="task-middle">
              <h2>{res?.data?.title}</h2>
            </div>

          </>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
    
    </div>
    </>
  );

}
