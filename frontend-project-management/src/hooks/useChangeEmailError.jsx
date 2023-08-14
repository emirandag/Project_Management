import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useChangeEmailError = (res, setRes, setChangeEmailOk) => {

    console.log(res);
    
    // 200: true
    if (res?.status == 200) {
        setChangeEmailOk(true)
        Swal.fire({
            icon: "success",
            title: "Change email ok ✅",
            showConfirmButton: false,
            timer: 1500,
        });
        setRes(() => {});
    }


    // 500 : server internal error
    if (res?.response?.status == 500) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Internal Server Error ❎!",
        showConfirmButton: false,
        timer: 1500,
      });
      setRes(() => {});
    }
}
