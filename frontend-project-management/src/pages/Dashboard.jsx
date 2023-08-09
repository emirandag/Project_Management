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
      <div className="project-header">
      
        <div className="project-status">
          <div className="project-info">
            <p className="project-info-text">{res?.data?.length}</p>
            <p>Total Projects</p>
          </div>
          <div className="project-info">
            <p className="project-info-text">{res?.data?.filter(project => project.isClosed == false).length}</p>
            <p>Open Projects</p>
          </div>
          <div className="project-info">
            <p className="project-info-text">{res?.data?.filter(project => project.isClosed == true).length}</p>
            <p>Closed Projects</p>
          </div>
        </div>
        <div className="project-btn-add">
          <button onClick={() => navigate("/projects")}><i className="fa fa-plus" aria-hidden="true"></i></button>
      </div>
      </div>
      
      <div className='projects-container'>
        {/* <div className='project-box-wrapper'> */}
        

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
      {/* </div> */}
    </>
  )
}
