import "./CardTask.css"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useDeleteTaskError } from "../hooks";

import { colorPalette } from "../utils/colorPalette";


export const CardTask = ({ task, setDeleteTaskOk }) => {
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate();
    const color = colorPalette()

    const renderToTaskById = (idTask) => {

      return navigate(`/projects/${id}/tasks/${idTask}`);
      // return <Navigate to={`/projects/${id}/tasks/${idTask}`} />
    };

  return (
    <>
      <div 
        className="task-box" 
        style={{
          backgroundColor: `${task.isCompleted ? color.colorTask.colorClosed : color.colorTask.colorOpen}`,
          
          boxShadow: `1px 2px 5px ${task.isCompleted ? color.colorProgressBar.colorClosed : color.colorProgressBar.colorOpen}`
        }}
        onClick={() => renderToTaskById(task._id)}>
        <div className="task-header">
            <h3>{task.title}</h3>
        </div>
        <div className="task-info">
          <span>{task?.assignedTo == user._id && user.email}</span>
          <span>{task?.isCompleted ? "Completada" : "Abierta"}</span>
          <button
            disabled={task?.isCompleted}
            onClick={(e) => {
                e.stopPropagation();
                useDeleteTaskError(task._id, setDeleteTaskOk)
            }}
          >
            <i className="fa fa-trash fa-2xs"></i>
          </button>
        </div>
      </div>
    </>
  );
};
