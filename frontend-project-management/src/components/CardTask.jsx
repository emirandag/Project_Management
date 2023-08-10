import "./CardTask.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useDeleteTaskError } from "../hooks";
import { useState } from "react";

export const CardTask = ({ project, task }) => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const [deleteTaskOk, setDeleteTaskOk] = useState(false)
    
    const renderToTaskById = (id, project) => {
      console.log(id);
      console.log(project);
      return navigate(`/tasks/${id}`, {state: project?.title});
    };

  return (
    <>
      <div className="task-box" onClick={() => renderToTaskById(task._id, project)}>
        <h3>{task.title}</h3>
        <div className="task-info">
          <span>{task?.assignedTo == user._id && user.email}</span>
          <span>{task?.isCompleted ? "Completada" : "Abierta"}</span>
          <button
            disabled={task?.isCompleted}
            onClick={() => useDeleteTaskError(task._id, setDeleteTaskOk)}
          >
            <i className="fa fa-trash fa-2xs"></i>
          </button>
        </div>
      </div>
    </>
  );
};
