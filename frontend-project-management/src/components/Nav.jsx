import './Nav.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext';

export const Nav = () => {
  const { user, userLogout } = useAuth();
  return (
    <>
      <div>
        LOGO
      </div>
      <nav className='nav'>
          <NavLink to='/'><button className='btn-nav'>HOME</button></NavLink>
          {user == null && (
          <NavLink to='/login'><button className='btn-nav'>LOGIN</button></NavLink>
          )}
          {user !== null ? (
          <NavLink to='/dashboard'><button className='btn-nav'>DASHBOARD</button></NavLink>
          ) : null}
          {user == null && (
          <NavLink to='/register'><button className='btn-nav'>REGISTER</button></NavLink>
          )}
          {/* <NavLink to='/gallery'><button className='btn-nav'>GALLERY</button></NavLink>
          <NavLink to='/details'><button className='btn-nav'>DETAILS</button></NavLink> */}
          {user !== null ? (
            <>
            <NavLink to='/projects'><button className='btn-nav'>PROJECTS</button></NavLink>
            <NavLink to='/tasks'><button className='btn-nav'>TASKS</button></NavLink>
            </>
           ) : null}
          {/* {user !== null ? (
          <NavLink to='/profile'><button className='btn-nav'>PROFILE</button></NavLink>
          ) : null}
          {user !== null && (
          <NavLink><button className='btn-nav' onClick={() => userLogout()}>LOGOUT</button></NavLink>
          )}              */}    
      </nav>
      <div className='dropdown avatar-profile'>
        {/* <button class="dropbtn">Dropdown</button> */}
        <img className="dropimg" src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="avatar" />
        <div className="dropdown-content">
          {user == null && (
            <NavLink to='/login'><button className='btn-dropdown'>LOGIN</button></NavLink>
          )}
          {user !== null && (
            <>
              <NavLink to='/profile'><button className='btn-dropdown'>PROFILE</button></NavLink>
              <NavLink to='/dashboard'><button className='btn-dropdown'>DASHBOARD</button></NavLink>
              <NavLink to='/login'><button className='btn-dropdown' onClick={() => userLogout()}>LOGOUT</button></NavLink>
            </>
          )}  
        </div>
      </div>
    </>
  )
}