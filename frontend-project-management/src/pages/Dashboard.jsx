import { useEffect, useState } from "react"
import "./Dashboard.css"
import { openProjects, showProjects } from "../services/API/project.service"
import { Navigate, useNavigate } from "react-router-dom"
import { CardProject } from "../components"
import { useAuth } from "../context/authContext"
import jwtDecode from "jwt-decode";

const colorPalette = ['#ffd3e2', '#d5deff', '#DBF6FD', '#fee4cb', '#c8f7dc', '#e9e7fd'];
const progressBarPalette = ['#DF3670', '#4067F9', '#096C86', '#FF942E', '#34C471', '#4F3FF0'];
const taskPalette = ['#fff1f6', '#f2f5ff', '#f4fcfe', '#fef6ef', '#eefcf4', '#f8f7fe'];

export const Dashboard = () => {
  const [res, setRes] = useState(null)
  const { user, rol } = useAuth()
  const [changeRender, setChangeRender] = useState(
    rol != "user" ? "totalProjects" : "myProjects"
  );
  const navigate = useNavigate()
  

  
  // const decodedToken = jwtDecode(user.token);
  // console.log("Token: ", decodedToken);

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

          {rol != "user" && (
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
          rol != "user" && (
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
        rol != "user" && changeRender == "totalProjects"  ? (
          res?.data?.map((project, index) => {
            
            const colorIndex = index % colorPalette.length;
            const colorProgressIndex = index % progressBarPalette.length;
            const colorTaskIndex = index % taskPalette.length;
            const backgroundColor = colorPalette[colorIndex];
            const backgroundColorProgress = progressBarPalette[colorProgressIndex];
            const backgroundColorTask = taskPalette[colorTaskIndex];
            console.log(backgroundColor)
            return (<CardProject 
              key={project._id} 
              project={project} 
              backgroundColor={backgroundColor}
              backgroundColorProgress={backgroundColorProgress} 
              backgroundColorTask={backgroundColorTask}
              />)
  
  })
          
        ) : rol != "user" && changeRender == "openProjects" ? (
          res?.data?.filter(project => project.isClosed == false).map((project, index) => {
            
            const colorIndex = index % colorPalette.length;
            const colorProgressIndex = index % progressBarPalette.length;
            const colorTaskIndex = index % taskPalette.length;
            const backgroundColor = colorPalette[colorIndex];
            const backgroundColorProgress = progressBarPalette[colorProgressIndex];
            const backgroundColorTask = taskPalette[colorTaskIndex];
            console.log(backgroundColor)
            return (<CardProject 
              key={project._id} 
              project={project} 
              backgroundColor={backgroundColor}
              backgroundColorProgress={backgroundColorProgress} 
              backgroundColorTask={backgroundColorTask}
              />)
  
  })
        ) : changeRender == "myProjects" ? (
          res?.data?.filter(project => project.users.some(userProject => userProject._id === user._id)).map((project, index) => {
            
            const colorIndex = index % colorPalette.length;
            const colorProgressIndex = index % progressBarPalette.length;
            const colorTaskIndex = index % taskPalette.length;
            const backgroundColor = colorPalette[colorIndex];
            const backgroundColorProgress = progressBarPalette[colorProgressIndex];
            const backgroundColorTask = taskPalette[colorTaskIndex];
            //console.log(backgroundColor)
            return (<CardProject 
              key={project._id} 
              project={project} 
              backgroundColor={backgroundColor}
              backgroundColorProgress={backgroundColorProgress} 
              backgroundColorTask={backgroundColorTask}
              />)
             })) : (null)
      ) : (<h1>Loading ...</h1>)} 

      </div>
      </div>
    </>
  )
}
