import { useEffect, useState } from "react"
import "./Dashboard.css"
import { showProjects } from "../services/API_user/project.service"

export const Dashboard = () => {
  const [res, setRes] = useState({})

  const handleClick = async () => {
    setRes(await showProjects())
  }

  useEffect(() => {
    console.log(res);
  }, [res])

  return (
    <>
    
      <button onClick={() => handleClick()}>Show Projects</button>

      <div className='dashboard-container'>
        <div className='project-box'>
          <div className='project-box-header'>
            <h3>Project</h3>
          </div>
          
          <div className='tasks-box'>
            <div className="task-box">
              Task
            </div>
            <div className="task-box">
              <h4>Title</h4>
              <h4>User</h4>
              <p>Completed</p>
            </div>
          </div>
        </div>
        <div className='project-add'>
          <button>Add</button>
        </div>
        <div className='project-add'>
          <button>Add</button>
        </div>
        <div className='project-add'>
          <button>Add</button>
        </div>
        <div className='project-add'>
          <button>Add</button>
        </div>
        <div className='project-add'>
          <button>Add</button>
        </div>
      </div>
    </>
  )
}
