import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useChangeRolError = (res, setRes, setChangeRolOk) => {

    ///console.log(res);
    
    // 200 : UpdateUser: true
    if (res?.status == 200) {
        setChangeRolOk(true)
        Swal.fire({
            icon: "success",
            title: "Change rol ok ✅",
            showConfirmButton: false,
            timer: 1500,
        });
        setRes(() => {});
    }

    if (res?.response?.data?.includes("User not found")) {
        setRes(() => {});
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The email is not valid!,  ❎ Try again, please",
            showConfirmButton: false,
            timer: 3000,
        });
    }

    if (res?.response?.data?.includes("The rol is not updated")) {
        setRes(() => {});
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The rol is not updated!,  ❎ Try again, please",
            showConfirmButton: false,
            timer: 3000,
        });
    }

    // 404 : General
    if (res?.response?.status == 404) {
      Swal.fire({
        icon: "error",
        title: "Internal Error ❎.",
        text: "Please, try again",
        showConfirmButton: false,
        timer: 3000,
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
