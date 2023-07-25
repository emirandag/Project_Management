import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";


export const createProject = async (formData) => {
    return APIuser.post("/projects/createproject", formData, {
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