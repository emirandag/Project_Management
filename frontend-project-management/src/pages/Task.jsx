import "./Task.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addUserTask, showTaskById } from "../services/API/task.service";
import { useAddUserTaskError, useUpdateTaskError } from "../hooks";
import { useAuth } from "../context/authContext";


export const Task = () => {
    const { id } = useParams();
    const { user } = useAuth()
    const [res, setRes] = useState({})
    const [updateTaskOk, setUpdateTaskOk] = useState(false)
    const [completedTaskOk, setCompletedTaskOk] = useState(false)
    const [dataTask, setDataTask] = useState({})

    const loadPage = async (id) => {
        console.log(id);
        const data = await showTaskById(id)
        setRes(data)
      }
    
      useEffect(() => {
        loadPage(id)
      }, [])




  return (
    <>
      <div className="task-container">
        {res ? (
          <>
            <div className="task-top">
              <div className="task-avatar">
                {res?.data?.assignedTo ? (
                  <img
                    className="avatar-user"
                    src={user.photo}
                    alt={user.name}
                    key={user._id}
                  />
                ) : (
                  <button 
                    onClick={() => useAddUserTaskError(id, user?.email, res, setCompletedTaskOk, setRes)}
                    // onClick={() => useUpdateTaskError(id, setUpdateTaskOk)}
                  >
                    Assigned to me
                  </button>
                )}
              </div>
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
            {/* <div className="project-container-tasks">
              {res?.data?.tasks?.map((task) => (
                <div className="project-task">
                  <h3>{task.title}</h3>
                  <div>
                    <span>{task?.assignedTo}</span>
                    <span>{task?.isCompleted ? "Completada" : "Abierta"}</span>
                  </div>
                </div>
              ))}
            </div> */}

          </>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
    </>
  );

}
