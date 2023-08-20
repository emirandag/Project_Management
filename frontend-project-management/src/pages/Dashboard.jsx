import { useEffect, useState } from "react"
import "./Dashboard.css"
import { showProjects } from "../services/API/project.service"
import { Navigate, useNavigate } from "react-router-dom"
import { CardProject } from "../components"
import { useAuth } from "../context/authContext"
import jwtDecode from "jwt-decode";

const colorPalette = ['#ffd3e2', '#d5deff', '#DBF6FD', '#fee4cb', '#c8f7dc', '#e9e7fd'];
const progressBarPalette = ['#DF3670', '#4067F9', '#096C86', '#FF942E', '#34C471', '#4F3FF0'];

export const Dashboard = () => {
  const [res, setRes] = useState(null)
  // const [renderPageProject, setRenderPageProject] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  console.log(user.token);

  const decodedToken = jwtDecode(user.token);
  console.log("Token: ", decodedToken);

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
        res?.data?.map((project, index) => {
          
          const colorIndex = index % colorPalette.length;
          const colorProgressIndex = index % progressBarPalette.length;
          const backgroundColor = colorPalette[colorIndex];
          const backgroundColorProgress = progressBarPalette[colorProgressIndex];
          console.log(backgroundColor)
          return (<CardProject 
            key={project._id} 
            project={project} 
            backgroundColor={backgroundColor}
            backgroundColorProgress={backgroundColorProgress} 
            />)

})
        
      ) : <h1>Loading ...</h1>}
      
      </div>
      </div>
    </>
  )
}
