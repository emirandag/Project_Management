import "./Task.css"
import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { showTaskById } from "../services/API/task.service";
import { useAddUserTaskError, useDeleteTaskError, useUpdateTaskError } from "../hooks";
import { useAuth } from "../context/authContext";
import { Comments } from "../components";


export const NewTaskDetails = () => {
    const { id } = useParams();
    const { user } = useAuth()
    const [res, setRes] = useState({})
    const [updateTaskOk, setUpdateTaskOk] = useState(false)
    const [deleteTaskOk, setDeleteTaskOk] = useState(false)
    const [addUserOk, setAddUserOk] = useState(false)


    
    //console.log(location);

    const loadPage = async (id) => {
        const data = await showTaskById(id)
        setRes(data)
      }
    
      useEffect(() => {
        
        loadPage(id)
      
      }, [updateTaskOk, addUserOk])


      if (deleteTaskOk) {
        return <Navigate to={`/projects/${res?.data?.getTaskById?.project}`} />
      }



  return (
    <>
    <div className="task-dashboard">
      
    <h2>{res?.data?.getProject?.title}</h2>
      <div className="task-container">
        {console.log(res)}
        {res ? (
          <>
            <div className="task-top">
              <div className="task-avatar">
                {res?.data?.getTaskById?.assignedTo ? (
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
                  disabled={res?.data?.getTaskById?.isCompleted}
                    onClick={() => useAddUserTaskError(id, user?.email, setAddUserOk)}
                    // onClick={() => useUpdateTaskError(id, setUpdateTaskOk)}
                  >
                    Assigned to me
                  </button>
                )}
              </div>
              <button 
              disabled={res?.data?.getTaskById?.isCompleted}
              onClick={() => useDeleteTaskError(id, setDeleteTaskOk)}>Delete task</button>
              {res?.data?.getTaskById?.isCompleted == false ? (
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
              <h2>{res?.data?.getTaskById?.title}</h2>
            </div>
            <div className="task-bottom">
                <Comments comments={res?.data?.getTaskById?.comments}/>
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
