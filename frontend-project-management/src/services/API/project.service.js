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