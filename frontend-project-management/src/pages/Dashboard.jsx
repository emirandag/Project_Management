import { useEffect, useState } from "react";
import "./Dashboard.css";
import { openProjects, showProjects } from "../services/API/project.service";
import { Navigate, useNavigate } from "react-router-dom";
import { CardProject, Pagination } from "../components";
import { useAuth } from "../context/authContext";

export const Dashboard = () => {
const navigate = useNavigate()
  const { user, getRol } = useAuth();
  const rol = getRol();
  const [changeRender, setChangeRender] = useState(rol !== "user" ? "totalProjects" : "myProjects");
  const [res, setRes]  = useState({})
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 6;

  useEffect(() => {
    loadPage();
  }, [changeRender]);

  const loadPage = async () => {
    const dataProject = await showProjects();
    setData(dataProject);
    setRes(dataProject)
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const lastIndex = currentPage * elementsPerPage;
  const firstIndex = lastIndex - elementsPerPage;

  let filteredProjects = data?.data || [];

  if (changeRender === "openProjects") {
    filteredProjects = filteredProjects.filter((project) => !project.isClosed);
  } else if (changeRender === "myProjects") {
    filteredProjects = filteredProjects.filter((project) =>
      project.users.some((userProject) => userProject._id === user._id)
    );
  }

  const currentElements = filteredProjects.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredProjects.length / elementsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderComponent = (componentName) => {
    setChangeRender(componentName);
    setCurrentPage(1); 
  };

  return (
    <>
      <>

      </>
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="project-header">
          <div className="project-status">
            {console.log(rol)}
            {rol != "user" && (
              <>
                <div
                  className="project-info"
                  onClick={(e) => {
                    e.stopPropagation();
                    renderComponent("totalProjects");
                  }}
                >
                  <p className="project-info-text">{res?.data?.length}</p>
                  <p>Total Projects</p>
                </div>
                <div
                  className="project-info"
                  onClick={(e) => {
                    e.stopPropagation();
                    renderComponent("openProjects");
                  }}
                >
                  <p className="project-info-text">
                    {
                      res?.data?.filter((project) => project.isClosed == false)
                        .length
                    }
                  </p>
                  <p>Open Projects</p>
                </div>
              </>
            )}

            <div
              className="project-info"
              onClick={(e) => {
                e.stopPropagation();
                renderComponent("myProjects");
              }}
            >
              <p className="project-info-text">
                {
                  res?.data?.filter((project) =>
                    project.users.some(
                      (userProject) => userProject._id === user._id
                    )
                  ).length
                }
              </p>
              <p>My Projects</p>
            </div>
          </div>
          {rol != "user" && (
            <div className="project-btn-add">
              <button onClick={() => navigate("/projects")}>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </div>

        <div className="projects-container">
        {filteredProjects.length > 0 ? (
          currentElements.map((project) => (
            <CardProject key={project._id} project={project} />
          ))
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      </div>
    </>
  );
};
