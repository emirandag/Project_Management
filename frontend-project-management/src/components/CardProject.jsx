import React from 'react'
import { useNavigate } from 'react-router-dom';

export const CardProject = ({project}) => {
    const navigate = useNavigate()
    const renderToProjectById = (id) => {
        console.log(id);
        return navigate(`/projects/${id}`)
      }
  return (
    <>
    <div className='project-box' onClick={() => renderToProjectById(project._id)} >
          <div className='project-box-header'>
            <h3>{project.title}</h3>
          </div>
          
          <div className='tasks-box'>
            {project.tasks.length > 0 ? (
                project.tasks.map(task => (
                    <div className="task-box">
                        {task.title}
                    </div>
                )) 
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
    </>
  )
}
