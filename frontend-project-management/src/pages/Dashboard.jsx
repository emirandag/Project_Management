import { useEffect, useState } from "react"
import "./Dashboard.css"
import { showProjects } from "../services/API/project.service"
import { Navigate, useNavigate } from "react-router-dom"

export const Dashboard = () => {
  const [res, setRes] = useState(null)
  const [renderPageProject, setRenderPageProject] = useState(false)
  const navigate = useNavigate()

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

  // if (renderPageProject) {
  //   return <Navigate to={`/projects/${res.data._id}`} />
  // }

  const renderToProjectById = (id) => {
    return navigate(`/projects/${id}`)
  }
  return (
    <>
    <div className='dashboard-container'>
      {/* <button onClick={() => handleClick()}>Show Projects</button> */}

      <div className='projects-container'>

      {res ? (
        res.data.map(project => (
<div className='project-box' onClick={() => renderToProjectById(project._id)}>
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
