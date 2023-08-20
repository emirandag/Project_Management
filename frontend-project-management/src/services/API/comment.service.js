import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApi.config";

export const createComment = async (formData) => {
    return APIuser.post(`/comments/createcomment`, formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
      .then((res) => res)
      .catch((error) => error)
  }


  export const updateComment = async (id, formData) => {
    return APIuser.patch(`/comments/updatecomment/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
      .then((res) => res)
      .catch((error) => error)
  }


export const deleteComment = async (id) => {
    return APIuser.delete(`/comments/deletecomment/${id}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
      .then((res) => res)
      .catch((error) => error)
  }


  export const getCommentsByTask = async (id) => {
    return APIuser.get(`/comments/task/${id}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`
      }
    })
      .then((res) => res)
      .catch((error) => error)
  }