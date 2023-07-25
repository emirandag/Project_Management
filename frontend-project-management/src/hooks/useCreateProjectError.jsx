import Swal from "sweetalert2/dist/sweetalert2.all.js"

export const useCreateProjectError = (res, setRes) => {
    if (res?.status == 201) {
        //setRegisterOk(() => true)
        
        Swal.fire({
          icon: "success",
          title: "Project created!",
          showConfirmButton: false,
          timer: 1500,
        })
        setRes({})
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
