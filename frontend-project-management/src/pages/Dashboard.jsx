import { useEffect, useState } from "react"
import "./Dashboard.css"
import { openProjects, showProjects } from "../services/API/project.service"
import { Navigate, useNavigate } from "react-router-dom"
import { CardProject } from "../components"
import { useAuth } from "../context/authContext"

export const Dashboard = () => {
  const [res, setRes] = useState(null)
  const { user, rol } = useAuth()
  const [changeRender, setChangeRender] = useState(
    rol == "admin" || rol == "manager" ? "totalProjects" : "myProjects"
  );
  const navigate = useNavigate()
  

  

  const loadPage = async () => {
    const dataProject = await showProjects()
    setRes(dataProject)
  }

  const renderizarComponente = (componente) => {
    console.log(componente);
    setChangeRender(componente);
  };

  useEffect(() => {

    loadPage()
 
  }, [])

 

  return (
    <>
    <div className='dashboard-container'>
      <div className="project-header">
      
        <div className="project-status">

          {rol == "admin" || rol == "manager" && (
<>
          <div className="project-info" onClick={(e) => {
          e.stopPropagation()
          renderizarComponente("totalProjects")
          }}>
            <p className="project-info-text">{res?.data?.length}</p>
            <p>Total Projects</p>
          </div>
          <div className="project-info" onClick={(e) => {
            e.stopPropagation()
            renderizarComponente("openProjects")
        }}>
            <p className="project-info-text">{res?.data?.filter(project => project.isClosed == false).length}</p>
            <p>Open Projects</p>
          </div>
</>
          )}
          
          <div className="project-info" onClick={(e) => {
            e.stopPropagation()
            renderizarComponente("myProjects")
          }}>
            <p className="project-info-text">{res?.data?.filter(project => project.users.some(userProject => userProject._id === user._id)).length}</p>
            <p>My Projects</p>
          </div>
        </div>
        {
          rol == "admin" || rol == "manager" && (
            <div className="project-btn-add">
              <button onClick={() => navigate("/projects")}><i className="fa fa-plus" aria-hidden="true"></i></button>
            </div>
          ) 
        }
        
      </div>
      
      <div className='projects-container'>
        {/* <div className='project-box-wrapper'> */}
        
{console.log(res?.data?.filter(project => project.users.some(userProject => userProject._id === user._id)))}
      {res ? (
        rol == "admin" || rol == "manager" && changeRender == "totalProjects"  ? (
          res?.data?.map((project) => {
            

        
            return (<CardProject 
              key={project._id} 
              project={project} 
              />)
  
  })
          
        ) : rol == "admin" || rol == "manager" && changeRender == "openProjects" ? (
          res?.data?.filter(project => project.isClosed == false).map((project, index) => {
            
            return (<CardProject 
              key={project._id} 
              project={project} 
              />)
  
  })
        ) : changeRender == "myProjects" ? (
          res?.data?.filter(project => project.users.some(userProject => userProject._id === user._id)).map((project, index) => {
            
            return (<CardProject 
              key={project._id} 
              project={project} 

              />)
             })) : (null)
      ) : (<h1>Loading ...</h1>)} 

      </div>
      </div>
    </>
  )
}
