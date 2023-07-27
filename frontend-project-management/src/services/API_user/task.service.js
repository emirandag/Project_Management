import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";


export const createTask = async (formData) => {
    return APIuser.post("/tasks/createtask", formData, {
        headers: {
          Authorization: `Bearer ${updateToken()}`
        }
      })
      .then((res) => res)
      .catch((error) => error);
};