import "./CardTask.css"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useDeleteTaskError } from "../hooks";

import { colorPalette } from "../utils/colorPalette";


export const CardTask = ({project, task, setDeleteTaskOk }) => {
    const { user, getRol } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate();
    const color = colorPalette()
    const rol = getRol()

    const renderToTaskById = (idTask) => {

      return navigate(`/projects/${id}/tasks/${idTask}`);
      // return <Navigate to={`/projects/${id}/tasks/${idTask}`} />
    };

  return (
    <>
      <div 
        className="task-box" 
        style={{
          // backgroundColor: `${task.isCompleted ? color.colorTask.colorClosed : color.colorTask.colorOpen}`,
          
          boxShadow: `1px 2px 5px ${task.isCompleted ? color.colorProgressBar.colorClosed : color.colorProgressBar.colorOpen}`
        }}
        onClick={() => renderToTaskById(task._id)}>
        <div className="task-header">
            <h3>{task.title}</h3>
        </div>
        <div className="task-info">
          <div className="task-info-data">
          <span
          className="task-info-user"
          >{project.users?.filter((userTask) => userTask._id == task.assignedTo).map((userTask) => userTask.email)}</span>
            
          </div>
          <div className="task-info-data">
          <span 
          className="task-info-status"
          style={{
            backgroundColor: `${task.isCompleted ? color.colorTask.colorClosed : color.colorTask.colorOpen}`,
          }}  
          >{task?.isCompleted ? "Completada" : "Abierta"}</span>
          </div>
          <div className="task-info-btn">
          <button
          disabled={task?.isCompleted || rol == "user"}
          onClick={(e) => {
              e.stopPropagation();
              useDeleteTaskError(task._id, setDeleteTaskOk)
          }}
        >
          <i className="fa fa-trash fa-2xs"></i>
        </button>
        </div>
          
        </div>
      </div>
    </>
  );
};
