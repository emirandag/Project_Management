import './Nav.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { useState } from 'react';
import { useResize } from '../hooks';


export const Nav = () => {
  const { user, userLogout, rol } = useAuth();
  const { ancho } = useResize()
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>

    
<div className="navbar">
      <div className="nav-logo">LOGO</div>
      <nav className={`nav-items ${isOpen && 'open'}`}>

          <NavLink to='/'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>HOME</button></NavLink>
          {user == null && (
          <NavLink to='/login'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>LOGIN</button></NavLink>
          )}
          {user !== null ? (
          <NavLink to='/dashboard'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>DASHBOARD</button></NavLink>
          ) : null}
          {user == null && (
          <NavLink to='/register'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>REGISTER</button></NavLink>
          )}
          {/* <NavLink to='/gallery'><button className='btn-nav'>GALLERY</button></NavLink>
          <NavLink to='/details'><button className='btn-nav'>DETAILS</button></NavLink> */}
          {user !== null ? (
            <>
            {rol == "admin" || rol == "manager" ? (
              <>
              <NavLink to='/projects'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>PROJECTS</button></NavLink>
              <NavLink to='/newtasks'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>TASKS</button></NavLink>
              </>
            ) : (
              <NavLink to='/mytasks'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>TASKS</button></NavLink>
            )}
            {rol == "admin" && (
            <NavLink to='/changerol'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>CHANGE ROL</button></NavLink>
            )}
            </>
           ) : null}

           {
            ancho < 600 && (
              user !== null ? (
                <>
                <NavLink to='/profile'><button className='btn-nav' onClick={() => setIsOpen(!isOpen)}>PROFILE</button></NavLink>
                <NavLink to='/login'><button className='btn-nav' onClick={(e) => { 
                  userLogout() 
                  setIsOpen(!isOpen)
                }}>LOGOUT</button></NavLink>
                </>
                
                ) : null
            )
           }
                      
      </nav>
      
      

      {ancho > 600 ? 
      <div className='dropdown avatar-profile'>

      <img className="dropimg" src={!user ? `https://ionicframework.com/docs/img/demos/avatar.svg` : `${user.photo}`} alt="avatar" />
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
      :
      <div
        className={`nav-hamburger ${isOpen && 'open'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      }
      
    </div>
    </>

  )
}