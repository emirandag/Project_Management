import { Link } from "react-router-dom"
import "./Home.css"

export const Home = () => {
  return (
    <div className='Home'>
      <p>Welcome to our web!</p>
      <div className="section">
      <p>This application is designed to manage projects</p>
      <p>through the different tasks created by project managers.</p>
       
      
      </div>

      <p>If you already belong to the organization. <Link to="/login"><b>Sign In</b></Link></p>

      <p>If you are not a member. <Link to="/register"><b>Sign up</b></Link></p>
      
    </div>
  )
}