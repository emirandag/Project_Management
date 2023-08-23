import { updateToken } from "../../utils/updateToken";
import { APIuser } from "./serviceApi.config";

export const registerUser = async (formData) => {
    return APIuser.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    .then((res) => res)
    .catch((error) => error)
}

export const checkCodeConfirmationUser = async (formData) => {
    return APIuser.post("/users/checkuser", formData)
      .then((res) => res)
      .catch((error) => error);
  };

export const loginUser = async (formData) => {
  return APIuser.post("/users/login", formData)
  .then((res) => res)
  .catch((error) => error)
}

export const autoLoginUser = async (formData) => {
  return APIuser.post("/users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const forgotPasswordUser = async (formData) => {
  return APIuser.post("/users/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const changePasswordUser = async (formData) => {
  return APIuser.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`
    }
  })
    .then((res) => res)
    .catch((error) => error)
}

export const updateUser = async (formData) => {
  return APIuser.patch("/users/update/update", formData, {
    "Content-Type": "multipart/form-data",
    headers: {
      Authorization: `Bearer ${updateToken()}`
    }
  })
    .then((res) => res)
    .catch((error) => error);
}

export const deleteUser = async () => {
  return APIuser.delete("/users/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`
    }
  })
    .then((res) => res)
    .catch((error) => error)
}

export const resendCodeConfirmationUser = async (formData) => {
  return APIuser.post("/users/resendcode", formData)
    .then((res) => res)
    .catch((error) => error)
}

export const getAllUsers = async () => {
  return APIuser.get("/users/",  {
    headers: {
      Authorization: `Bearer ${updateToken()}`
    }
  })
    .then((res) => res)
    .catch((error) => error)
}

export const addUserProject = async (id, projectId) => {
  console.log(id, projectId);
  return APIuser.patch(`/users/adduserproject/${id}&projectId=${projectId}`, {
  headers: {
    Authorization: `Bearer ${updateToken()}`
  }
})
  .then((res) => res)
  .catch((error) => error)
}


export const changeRol = async (formData) => {
  return APIuser.patch("/users/changerol", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`
    }
  })
    .then((res) => res)
    .catch((error) => error)
}

export const changeEmail = async (formData) => {
  return APIuser.post("/users/changeemail", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`
    }
  })
    .then((res) => res)
    .catch((error) => error)
}

export const checkNewEmail = async (formData) => {
  return APIuser.post("/users/checkemail", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`
    }
  })
    .then((res) => res)
    .catch((error) => error)
}


// export const addUserTask = async (formData) => {
//   return APIuser.post("/users/addusertask/:id", formData, {
//   headers: {
//     Authorization: `Bearer ${updateToken()}`
//   }
// })
//   .then((res) => res)
//   .catch((error) => error)
// }