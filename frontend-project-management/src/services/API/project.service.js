import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApi.config";


export const createProject = async (formData) => {
    return APIuser.post("/projects/createproject", formData, {
        headers: {
          Authorization: `Bearer ${updateToken()}`
        }
      })
      .then((res) => res)
      .catch((error) => error);
};

export const updateProject = async (id) => {
  return APIuser.patch(`/projects/updateproject/${id}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
    .then((res) => res)
    .catch((error) => error);
};


export const deleteProject = async (id) => {
  return APIuser.delete(`/projects/deleteproject/${id}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
    .then((res) => res)
    .catch((error) => error);
};


export const showProjects = async () => {
    return APIuser.get("/projects/", {
        headers: {
          Authorization: `Bearer ${updateToken()}`
        }
      })
      .then((res) => res)
      .catch((error) => error);
};

export const showProjectById = async (id) => {
  return APIuser.get(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
    .then((res) => res)
    .catch((error) => error);
};

export const addMemberProject = async (projectId, formData) => {
  console.log(projectId, formData);
  return APIuser.post(`/projects/addmemberproject/${projectId}`, formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
    .then((res) => res)
    .catch((error) => error);
};

