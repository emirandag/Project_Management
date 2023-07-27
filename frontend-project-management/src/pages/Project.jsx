import "./Project.css"
import { useParams } from "react-router-dom";


export const Project = () => {
    const { id } = useParams();
  return (
    <>
        <div className="project-container">
            <div className="project-top">
                <span><img src="j" alt="avatar" /></span>
                <h2>Project Title</h2>
                <button>Close</button>
            </div>
            <div className="project-middle">
                <div className="project-middle-left">
                    <button>Add member</button>
                    <button>Add task</button>
                </div>
                <div className="project-middle-right">
                    <button>Delete project</button>
                </div>
                
            </div>
            <div className="project-container-tasks">
                <div>Task title</div>
            </div>
        </div>
    </>
    
  )
}
