import { useEffect, useState } from "react"
import "./Dashboard.css"
import { showProjects } from "../services/API_user/project.service"

export const Dashboard = () => {
  const [res, setRes] = useState(null)

  const loadPage = async () => {
    const dataProject = await showProjects()
    setRes(dataProject)
  }

  useEffect(() => {
    //console.log(res.data[0].title);
    loadPage()
    //console.log(res);
  }, [])
  console.log(res);
  return (
    <>
    <div className='dashboard-container'>
      {/* <button onClick={() => handleClick()}>Show Projects</button> */}

      <div className='project-container'>

      {res ? (
        res.data.map(project => (
<div className='project-box'>
          <div className='project-box-header'>
            <h3>{project.title}</h3>
          </div>
          
          <div className='tasks-box'>
            {project.tasks.length > 0 ? (
              <div className="task-box">
                Task
              </div>
            ) : (
              <div className="task-box">
                No hay tareas
              </div>
            )
            }
            {/* <div className="task-box">
              Task
            </div> */}
            {/* <div className="task-box">
              <h4>Title</h4>
              <h4>User</h4>
              <p>Completed</p>
            </div> */}
          </div>
        </div>
        ))
        
      ) : <h1>Loading ...</h1>}
      
        {/* <div className='project-add'>
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
        </div> */}
      </div>
        
      </div>
    </>
  )
}
