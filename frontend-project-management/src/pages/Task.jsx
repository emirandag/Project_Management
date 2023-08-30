import "./Task.css";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { addUserTask, showTaskById } from "../services/API/task.service";
import {
  useAddUserTaskError,
  useDeleteTaskError,
  useUpdateTaskError,
} from "../hooks";
import { useAuth } from "../context/authContext";
import { Comments } from "../components";
import { colorPalette } from "../utils/colorPalette";

export const Task = () => {
  const { id } = useParams();
  const { user, getRol } = useAuth();
  const [res, setRes] = useState({});
  const [updateTaskOk, setUpdateTaskOk] = useState(false);
  const [deleteTaskOk, setDeleteTaskOk] = useState(false);
  const [addUserOk, setAddUserOk] = useState(false);
  const color = colorPalette();
  const rol = getRol()

  const loadPage = async (id) => {
    // console.log(id);
    const data = await showTaskById(id);
    setRes(data);
  };

  useEffect(() => {
    loadPage(id);
  }, [updateTaskOk, addUserOk]);

  if (deleteTaskOk) {
    return <Navigate to={`/projects/${res?.data?.getTaskById?.project}`} />;
  }

  return (
    <>
      <div className="task-dashboard">
        
        <h2>{res?.data?.getProject?.title}</h2>
        <div className="task-container">
          
          {res ? (
            <>
            <div className="task-status"
            style={{
                backgroundColor: `${
                  res?.data?.getTaskById?.isCompleted
                    ? color.colorProgressBar.colorClosed
                    : color.colorProgressBar.colorOpen
                }`,
            }}
            >
              {res?.data?.getTaskById?.isCompleted ? "Closed task" : "Open task"}
            </div>
            {/* {console.log(res.data)} */}
              <div className="task-top">
                <div className="task-avatar">
                  {res?.data?.getTaskById?.assignedTo ? (
                    <>
                      <img
                        className="avatar-user"
                        src={res?.data?.getUser?.photo}
                        alt={res?.data?.getUser?.name}
                        key={res?.data?.getUser?._id}
                      />
                      <h4>{res?.data?.getUser?.email}</h4>
                    </>
                  ) : (
                    <button
                      disabled={res?.data?.getTaskById?.isCompleted}
                      onClick={() =>
                        useAddUserTaskError(id, user.email, setAddUserOk)
                      }
                      // onClick={() => useUpdateTaskError(id, setUpdateTaskOk)}
                    >
                      Assigned to me
                    </button>
                  )}
                </div>
                {rol != "user" &&
                <button
                disabled={res?.data?.getTaskById?.isCompleted}
                onClick={() => useDeleteTaskError(id, setDeleteTaskOk)}
              >
                Delete task
              </button>
                }
                
                {res?.data?.getTaskById?.isCompleted == false ? (
                  <button
                    onClick={() => useUpdateTaskError(id, setUpdateTaskOk)}
                  >
                    Complete Task
                  </button>
                ) : rol != "user" ? (
                  <button
                  onClick={() => useUpdateTaskError(id, setUpdateTaskOk, open = res?.data?.getTaskById?.isCompleted)}
                  >
                    Open
                  </button>
                ) : (
                  <button disabled>Completed</button>
                )}
              </div>
              <div className="task-middle">
                <h2>{res?.data?.getTaskById?.title}</h2>
              </div>
              <div className="task-bottom">
                <Comments commentsClosed={res?.data?.getTaskById?.isCompleted} />
              </div>
            </>
          ) : (
            <h1>Loading ...</h1>
          )}
        </div>
      </div>
    </>
  );
};
