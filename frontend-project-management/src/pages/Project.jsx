import { useEffect, useState } from "react";
import "./Project.css";
import {
  Navigate,
  useParams,
} from "react-router-dom";

import {
  useDeleteProjectError,
  useDeleteTaskError,
  useUpdateProjectError,
} from "../hooks";
import { showProjectById } from "../services/API/project.service";
import { useAuth } from "../context/authContext";
import { CardTask } from "../components";
import { colorPalette } from "../utils/colorPalette";

export const Project = () => {
  const { id } = useParams();
  const { getRol } = useAuth();
  const [res, setRes] = useState({});
  const [renderPageAddMember, setRenderPageAddMember] = useState(false);
  const [renderPageTask, setRenderPageTask] = useState(false);
  const [deleteProjectOk, setDeleteProjectOk] = useState(false);
  const [updateProjectOk, setUpdateProjectOk] = useState(false);
  const [deleteTaskOk, setDeleteTaskOk] = useState(false);
  const color = colorPalette() 
  const rol = getRol()

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
    return <Navigate to={`/projects/${id}/tasks`} />;
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
            backgroundColor: `${res?.data?.isClosed ? color.colorProject.colorClosed : color.colorProject.colorOpen }`,
            boxShadow: `1px 2px 5px ${res?.data?.isClosed ? color.colorTask.colorClosed : color.colorTask.colorOpen}`
            
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
                    <img
                      src={user.photo}
                      alt={user.name}
                      key={user._id}
                      title={user.email}
                    />
                  )
                )}
              </div>
            </div>
            {rol !== "user" && (
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
                  <i className="fa fa-plus-square" aria-hidden="true"></i>
                  Add task
                </button>
                <button
                  disabled={res?.data?.isClosed && rol != "admin" }
                  onClick={() => useDeleteProjectError(id, setDeleteProjectOk)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  Delete project
                </button>
                <button
                  disabled={res?.data?.isClosed}
                  onClick={() => useUpdateProjectError(id, setUpdateProjectOk)}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                  {res?.data?.isClosed ? "Closed" : "Close Project"}
                </button>
              </div>
            )}

            <div className="project-container-tasks">
              {res?.data?.tasks.length > 0 ? 
              res?.data?.tasks?.map((task) => (
                <CardTask
                  project={res?.data}
                  task={task}
                  key={task._id}
                  setDeleteTaskOk={setDeleteTaskOk}
                />
              ))
              : <h3>No hay tareas asociadas</h3>}
              
            </div>
          </>
        </div>
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
};
