import "./CardTask.css"
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useDeleteTaskError } from "../hooks";
import { useState } from "react";


export const CardTask = ({ task, setDeleteTaskOk, projectColor, taskColor }) => {
    const { user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate();
    
    const renderToTaskById = (idTask) => {

      return navigate(`/projects/${id}/tasks/${idTask}`);
    };

  return (
    <>
      <div 
        className="task-box" 
        style={{
          backgroundColor: projectColor,
          
          boxShadow: `1px 2px 5px ${taskColor}`
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
