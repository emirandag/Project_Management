import "./CardProject.css"
import { useNavigate } from 'react-router-dom';

export const CardProject = ({ project, backgroundColor, backgroundColorProgress, backgroundColorTask }) => {
  const navigate = useNavigate();
  const renderToProjectById = (id, backgroundColor, backgroundColorProgress, backgroundColorTask) => {
    console.log(id);
    return navigate(`/projects/${id}`, {state: {backgroundColor, backgroundColorProgress, backgroundColorTask}});
  };
  return (
    <>
      <div
        className="project-box"
        style={{backgroundColor: backgroundColor}}
        onClick={() => renderToProjectById(project._id, backgroundColor, backgroundColorProgress, backgroundColorTask)}
      >
        <div className="project-box-header">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project-box-main">
            <div className="project-box-status">
              <h4>Status:</h4>
              <p>{project.isClosed ? "Closed" : "Open"}</p> 
            </div>
          <div className="project-box-progress">
            <h4>Progress:</h4>
             {/* <progress     
              max={project.tasks.length}
              value={
                project.tasks.filter((task) => task.isCompleted == true).length
              }
              
              style={{ 
                
                '--webkit-progress-value': 'red',
                
                
              }}
            >
            </progress> */}
            <div className="progress-container">
        {/* <div class="skill html">80%</div> */}
              <div 
                className="progress bar" 

                style={{
                  backgroundColor: project.tasks.filter(task => task.isCompleted).length > 0 ? backgroundColorProgress : '#ffffff',
                  //padding: project.tasks.filter(task => task.isCompleted).length > 0 ? '2%' : '0',
                  width: `${(project.tasks.filter(task => task.isCompleted).length / project.tasks.length) * 100}%`
                }}
                ></div>
            </div>
              
            
            { project.tasks.length > 0 
            ? 
            parseInt((project.tasks.filter((task) => task.isCompleted == true).length*100)/project.tasks.length)
            :
            "0"
            }%
          </div>
          <div className="project-box-members">
            {project?.users?.map((user) => (

                <img src={user.photo} alt={user.email} key={user._id} />

            ))}
          </div>
        </div>

        <div className="project-box-footer">
          <h4>Tasks</h4>
          <div className="project-box-tasks">
            <div className="project-tasks">
              <p>{project.tasks.length}</p>
              <h5>Total</h5>
            </div>
            <div className="project-tasks">
              <p>
                {
                  project.tasks.filter((task) => task.isCompleted == false)
                    .length
                }
              </p>
              <h5>Open</h5>
            </div>
            <div className="project-tasks">
              <p>{project.tasks.filter((task) => !task.assignedTo).length}</p>
              <h5>NoUser</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
