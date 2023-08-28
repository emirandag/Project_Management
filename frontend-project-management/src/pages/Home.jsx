import { Link } from "react-router-dom"
import "./Home.css"
import { useAuth } from "../context/authContext"

export const Home = () => {
  const { user, getRol } = useAuth()
  const rol = getRol()
  return (
    <div className='Home'>
      <p>Welcome to our web!</p>
      <div className="section">
      <p>This application is designed to manage projects</p>
      <p>through the different tasks created by project managers.</p>
       
      
      </div>

      {!user ?
      <>
      <p>If you already belong to the organization. <Link to="/login"><b>Sign In</b></Link></p>

      <p>If you are not a member. <Link to="/register"><b>Sign up</b></Link></p>
      </>
      : user && rol != "user" ?
      <>
        <p>If you want to create a project. <Link to="/projects"><b>Go to Projects</b></Link></p>

        <p>If you want to create a task. <Link to="/newtasks"><b>Go to Tasks</b></Link></p>
      </>
      : user && rol == "user" &&
        <p>If you want to create a task. <Link to="/mytasks"><b>Go to Tasks</b></Link></p>
      } 
    </div>
  )
}