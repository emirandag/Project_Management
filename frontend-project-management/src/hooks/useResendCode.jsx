import Swal from "sweetalert2/dist/sweetalert2.all"

export const useResendCode = (res, setReloadPageError, setRes) => {
    console.log(res);
    // 200 
    if (res?.status == 200) {
        Swal.fire({
            icon: "success",
            title: "Ok send email with your code ✅",
            showConfirmButton: false,
            timer: 1500,
        });
    }
    
    if (res?.response?.data?.includes("User not found")) {
        setReloadPageError(() => true);
        Swal.fire({
          icon: "error",
          title: "Interval server error ❎.",
          text: "No delete user. Try login, please.",
          showConfirmButton: false,
          timer: 1500,
        });
    
        setRes(() => {});
    }

    if (res?.response?.status == 500 || res?.response?.status == 404) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Interval Server Error! Don't send email ❎!",
            showConfirmButton: false,
            timer: 1500,
        });
    }

}