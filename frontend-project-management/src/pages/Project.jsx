import { useEffect, useState } from "react";
import "./Project.css";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Modal from "../components/UI/Modal/Modal";
import {
  useDeleteProjectError,
  useDeleteTaskError,
  useUpdateProjectError,
} from "../hooks";
import { showProjectById } from "../services/API/project.service";
import { useAuth } from "../context/authContext";
import { CardTask } from "../components";

export const Project = () => {
  const { id } = useParams();
  const { rol } = useAuth();
  const [res, setRes] = useState({});
  const [renderPageAddMember, setRenderPageAddMember] = useState(false);
  const [renderPageTask, setRenderPageTask] = useState(false);
  const [deleteProjectOk, setDeleteProjectOk] = useState(false);
  const [updateProjectOk, setUpdateProjectOk] = useState(false);
  const [deleteTaskOk, setDeleteTaskOk] = useState(false);
  const navigate = useNavigate();
  // console.log(id);
  const location = useLocation();
  const projectColor = location?.state?.backgroundColor;
  const taskColor = location?.state?.backgroundColorProgress;
  const dataColor = location?.state?.backgroundColorTask;

  //console.log(location?.state);
  const loadPage = async (id) => {
    const dataProject = await showProjectById(id);
    setRes(dataProject);
  };

  useEffect(() => {
    loadPage(id);

    //console.log(res);
  }, [updateProjectOk]);

  useEffect(() => {
    loadPage(id);
    setDeleteTaskOk(false);
  }, [deleteTaskOk]);
  // console.log(res);

  if (renderPageAddMember) {
    return <Navigate to={`/projects/${id}/addmember`} />;
  }
  if (renderPageTask) {
    return navigate(`/projects/${id}/tasks`, { state: taskColor });
  }
  if (deleteProjectOk) {
    return <Navigate to={`/dashboard`} />;
  }

  //console.log(deleteTaskOk);

  return (
    <>
      {res?.data ? (
        <div
          className="project-container"
          style={{
            backgroundColor: dataColor,
            boxShadow: `1px 5px 5px ${projectColor}`,
          }}
        >
          <>
            <div className="project-top">
              <h2>{res?.data?.title}</h2>
              <div className="project-avatar">
                {res?.data?.users?.map((user) =>
                  user._id.includes(res?.data?.owner) ? (
                    <img
                      className="avatar-owner"
                      src={user.photo}
                      alt={user.name}
                      key={user._id}
                      title={user.email}
                    />
                    
                  ) : (
                    <img src={user.photo} alt={user.name} key={user._id} title={user.email} />
                  )
                )}
              </div>

              
            </div>
            {
              rol !== "user" &&
              (
<div className="project-action-btn">
                <button
                  disabled={res?.data?.isClosed}
                  onClick={() => setRenderPageAddMember(true)}
                >
                  <i className="fa fa-user-plus" aria-hidden="true"></i> 
                  Add member
                </button>
                <button
                  disabled={res?.data?.isClosed}
                  onClick={() => setRenderPageTask(true)}
                >
                  <i class="fa fa-plus-square" aria-hidden="true"></i>
                  Add task
                </button>
                <button
                  disabled={res?.data?.isClosed}
                  onClick={() => useDeleteProjectError(id, setDeleteProjectOk)}
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                  Delete project
                </button>
                <button
                  disabled={res?.data?.isClosed}
                  onClick={() => useUpdateProjectError(id, setUpdateProjectOk)}
                >
                  <i class="fa fa-times" aria-hidden="true"></i>
                  {res?.data?.isClosed ? "Closed" : "Close Project"}
                </button>
            </div>
              )
            }
            
            <div className="project-container-tasks">
              {res?.data?.tasks?.map((task) => (
                <CardTask
                  project={res?.data}
                  task={task}
                  key={task._id}
                  setDeleteTaskOk={setDeleteTaskOk}
                  projectColor={projectColor}
                  taskColor={taskColor}
                />
                // <div className="project-task" key={task._id}>
                //   <h3>{task.title}</h3>
                //   <div className="task-info">
                //     <span>{task?.assignedTo == user._id && user.email}</span>
                //     <span>{task?.isCompleted ? "Completada" : "Abierta"}</span>
                //     <button disabled={task?.isCompleted} onClick={() => useDeleteTaskError(task._id, setDeleteTaskOk)}><i className="fa fa-trash fa-2xs"></i></button>
                //   </div>
                // </div>
              ))}
            </div>
          </>
        </div>
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
};
