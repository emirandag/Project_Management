import { useState } from "react";
import "./Project.css"
import { Navigate, useParams } from "react-router-dom";
import Modal from "../components/UI/Modal/Modal";


export const Project = () => {
    const { id } = useParams();
    const [renderPage, setRenderPage] = useState(false);


    // const renderPage = (id) => {
    //     console.log("Entro");
    //     console.log(id);
    //     return <Navigate to={`/projects/${id}/addmember`} />
    // }

    if (renderPage) {
        return <Navigate to={`/projects/${id}/addmember`} />
    }

  return (
    <>
      <div className="project-container">
        <div className="project-top">
          <span>
            <img src="j" alt="avatar" />
          </span>
          <h2>Project Title</h2>
          <button>Close</button>
        </div>
        <div className="project-middle">
          <div className="project-middle-left">
            <button onClick={() => setRenderPage(true)}>Add member</button>
            {/* {render && (
              <Modal>
                <h1>Esto es una prueba del modal</h1>
                <h3>Add Member</h3>
                <button onClick={() => setRender(false)}>X</button>
                <input type="text" placeholder="Enter email member"/>
              </Modal>
            )} */}
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
  );
}
