import Swal from "sweetalert2/dist/sweetalert2.all.js"
import { addUserProject } from "../services/API/user.service";
import { useAddUserProjectError } from "./useAddUserProjectError";

export const useCreateProjectError = (res, setRes, setConfirmProjectOk, setConfirmUserProjectOk) => {
  console.log(res);
    if (res?.status == 201) {
        setConfirmProjectOk(() => true)  
        Swal.fire({
          icon: "success",
          title: "Project created!",
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          const resUser = await addUserProject(res?.data?.owner, res?.data?._id)
          //const response = resUser
          if (resUser) {
           return useAddUserProjectError(resUser, setRes, setConfirmUserProjectOk)
          }
          
        })
        // setRes({})
    }

    


    if (res?.response?.status == 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, Internal Error ❎",
          showConfirmButton: false,
          timer: 1500,
        })
        setRes({})
    }
}
