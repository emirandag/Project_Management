import { useEffect, useState } from "react"
import "./Dashboard.css"
import { showProjects } from "../services/API/project.service"
import { Navigate, useNavigate } from "react-router-dom"
import { CardProject } from "../components"

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

  return (
    <>
    <div className='dashboard-container'>
      <div className="project-btn">
          <button onClick={() => navigate("/projects")}>Add Project</button>
      </div>
      <div className='projects-container'>
        

      {res ? (
        res?.data?.map(project => (
          <CardProject key={project._id} project={project}/>

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
