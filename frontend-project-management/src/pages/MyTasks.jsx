import "./MyTasks.css"
import { useEffect, useState } from "react"
import { showOpenTasks } from "../services/API/task.service"
import { useAuth } from "../context/authContext"

export const MyTasks = () => {
  const { user } = useAuth()
  const [res, setRes] = useState({})

  const loadPage = async () => {
    const dataOpenTask = await showOpenTasks()
    setRes(dataOpenTask)
  }

  useEffect(() => {

    loadPage()
 
  }, [])

  return (
    <div className="mytask-container">
      <div className="mytask-dashboard">
        {console.log(user)}
        {res ? (
          <>
          <div className="mytask-header">
          <h3>Task title</h3>
          <h3>Project</h3>
          <h3>User</h3>
          <h3>Status</h3>
          <h3>Nº Comments</h3>
          </div>
          <>
          {
          res?.data?.map(task => (
            <div key={task._id} className="mytask-main">
              <p>{task.title}</p>
              <p>{task.project}</p>
              <p>{task.assignedTo == user._id ? user.email : "No Assigned"}</p>
              <p>{task.isCompleted ? "Completed" : "Open"}</p>
              <p>{task.comments.length}</p>
            </div>
          
          ))
          }
          </>
          </>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
      <div>

      </div>
    </div>
  )
}
