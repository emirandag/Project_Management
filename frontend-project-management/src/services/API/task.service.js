import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApi.config";


export const createTask = async (formData) => {
    return APIuser.post("/tasks/createtask", formData, {
        headers: {
          Authorization: `Bearer ${updateToken()}`
        }
      })
      .then((res) => res)
      .catch((error) => error);
};


export const updateTask = async (id) => {
  return APIuser.patch(`/tasks/updatetask/${id}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
    .then((res) => res)
    .catch((error) => error);
};

export const deleteTask = async (id) => {
  return APIuser.delete(`/tasks/deletetask/${id}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
    .then((res) => res)
    .catch((error) => error);
};


export const showTaskById = async (id) => {
  return APIuser.get(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
    .then((res) => res)
    .catch((error) => error);
};

export const addUserTask = async (taskId, email) => {
  console.log(taskId, email);
  return APIuser.patch(`/tasks/addusertask/${taskId}`, {
  headers: {
    Authorization: `Bearer ${updateToken()}`
  }
})
  .then((res) => res)
  .catch((error) => error)
}


