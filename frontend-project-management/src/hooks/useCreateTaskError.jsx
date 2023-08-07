import Swal from "sweetalert2/dist/sweetalert2.all.js"

export const useCreateTaskError = (res, setRes, setConfirmTaskOk) => {
    if (res?.status == 201) {
        setConfirmTaskOk(() => true)  
        Swal.fire({
          icon: "success",
          title: "Task created!",
          showConfirmButton: false,
          timer: 1500,
        })
        //setRes({})
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
