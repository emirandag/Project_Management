import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useRegisterError = (res, setRegisterOk, setRes, setAllUser) => {
  console.log(res);
  // 200 --->  respuesta ok register ok
  if (res?.status == 201) {
    const dataToString = JSON.stringify(res);
    sessionStorage.setItem("data", dataToString)
    setRegisterOk(() => true)
    
    Swal.fire({
      icon: "success",
      title: "Welcome to my Page 💌",
      showConfirmButton: false,
      timer: 1500,
    })
    setRes({})
  }

  // res --> 409 --> Usuario ya registrado
  if (res?.response?.status === 409) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User already exist!❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({})
  }

  // La contraseña no esta en el formato correcto
  if (res?.response?.data?.includes("User validation failed: password: Password not valid")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Min 8 characters, 1 upper case, 1 lower case and a special character ❎",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  // -------- 404 - error resend code -----------
    if (
      res?.response?.status == 404 &&
      res?.response?.data?.confirmationCode.includes("error, resend code")
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Register ok, error to resend code ❎",
        showConfirmButton: false,
        timer: 1500,
      });
      setRes({});
    }
  

  // res --> 500 --> Error general del server

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sorry, internal error ❎",
      showConfirmButton: false,
      timer: 1500,
    })
    setRes({})
  }
}