import "./MyTasks.css";
import { useEffect, useState } from "react";
import { showOpenTasks } from "../services/API/task.service";
import { useAuth } from "../context/authContext";
import { colorPalette } from "../utils/colorPalette";
import { useNavigate, useParams } from "react-router-dom";

export const MyTasks = () => {
  const { id } = useParams()
  const { user } = useAuth();
  const [res, setRes] = useState({});
  const [myTasks, setMyTasks] = useState(false)
  const navigate = useNavigate()
  const color = colorPalette();

  const loadPage = async () => {
    const dataOpenTask = await showOpenTasks();
    setRes(dataOpenTask);
  };

  const renderToTaskById = (idTask) => {

    return navigate(`/projects/${id}/tasks/${idTask}`);

  };
  console.log(res);

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <div className="mytask-container">
      <h2>{myTasks == false ? "Open tasks" : "My tasks"}</h2>
    
      <div className="mytask-btn">
      <button onClick={() => setMyTasks(false)}>Open tasks</button>
      <button onClick={() => setMyTasks(true)}>My tasks</button>
      </div>
      
      <div className="mytask-dashboard"
      
      >
        {res ? (
          <>
            <div className="mytask-header">
              <h3>Task title</h3>
              <h3>Project</h3>
              <h3>User</h3>
              <h3>Status</h3>
              <h3>Comments</h3>
            </div>
            <>
              {myTasks == false
                ? res?.data?.openTasks?.map((task) => (
                    <div
                      key={task._id}
                      className="mytask-main"
                      onClick={() => renderToTaskById(task._id)}
                      // style={{
                      //   backgroundColor: `${task.isCompleted ? color.colorTask.colorClosed : color.colorTask.colorOpen }`
                      // }}
                    >
                      <div className="task-field">
                        <p>{task.title}</p>
                      </div>
                      <div className="task-field">
                        <p>
                          {res?.data?.getProjects
                            ?.filter((project) => project._id === task.project)
                            .map((project) => project.title)}
                        </p>
                      </div>
                      <div className="task-field">
                        <p>
                          {/* {task.assignedTo == user._id
                            ? user.email
                            : "No Assigned"} */}
                          {res?.data?.getUsers?.filter((userTask) => userTask._id == task.assignedTo).map((userTask) => userTask.email)}
                        </p>
                      </div>
                      <div
                        className="task-field"
                        style={{
                          height: "100%",
                          backgroundColor: `${
                            task.isCompleted
                              ? color.colorProgressBar.colorClosed
                              : color.colorProgressBar.colorOpen
                          }`,
                        }}
                      >
                        <p>{task.isCompleted ? "Completed" : "Open"}</p>
                      </div>
                      <div className="task-field">
                        <p>{task.comments.length}</p>
                      </div>
                    </div>
                  ))
                : 
                res?.data?.openTasks
                    ?.filter((task) => task.assignedTo == user._id)
                    .map((task) => {
                      return (
                        <div
                          key={task._id}
                          className="mytask-main"
                          onClick={() => renderToTaskById(task._id)}
                          // style={{
                          //   backgroundColor: `${task.isCompleted ? color.colorTask.colorClosed : color.colorTask.colorOpen }`
                          // }}
                        >
                          <div className="task-field">
                            <p>{task.title}</p>
                          </div>
                          <div className="task-field">
                            <p>
                              {res?.data?.getProjects
                                ?.filter(
                                  (project) => project._id === task.project
                                )
                                .map((project) => project.title)}
                            </p>
                          </div>
                          <div className="task-field">
                            <p>
                              {task.assignedTo == user._id
                                ? user.email
                                : "No Assigned"}
                            </p>
                          </div>
                          <div
                            className="task-field"
                            style={{
                              height: "100%",
                              backgroundColor: `${
                                task.isCompleted
                                  ? color.colorProgressBar.colorClosed
                                  : color.colorProgressBar.colorOpen
                              }`,
                            }}
                          >
                            <p>{task.isCompleted ? "Completed" : "Open"}</p>
                          </div>
                          <div className="task-field">
                            <p>{task.comments.length}</p>
                          </div>
                        </div>
                      );
                    })}
            </>
          </>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
      <div></div>
    </div>
  );
};
