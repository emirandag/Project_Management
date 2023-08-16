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