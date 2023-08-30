import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useValidateEmailError = (resCheck, setResCheck, setValidateEmailOk, user, userLogin) => {

    console.log(resCheck);
    console.log(user);

    // 200: true
    if (resCheck?.status == 200) {
        const dataCustom = {
            ...user,
            email: resCheck?.data?.newEmail
          }
      
          const dataString = JSON.stringify(dataCustom)
          userLogin(dataString)
        setValidateEmailOk(() => true)
        Swal.fire({
            icon: "success",
            title: "Validate email and code ok ✅",
            showConfirmButton: false,
            timer: 1500,
        });

        //setResCheck(() => {});
    }
}