import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useLoginError = (res, setLoginOk, userLogin, setRes, setRol) => {

  // ---------- 200 - Todo OK ----------
  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      _id: res.data.user._id,
      photo: res.data.user.photo,
      check: res.data.user.check,
    }

    const dataString = JSON.stringify(dataCustom)
    userLogin(dataString)
    setLoginOk(() => true)
    setRol(res.data.user.rol)

    Swal.fire({
      icon: "success",
      title: "Welcome to my Page 💌",
      text: "Login ok ✅",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // ---------- 404: 'password dont match' ----------
  // if (res.response.data.includes("password")) {
    
  // }
  if (res?.response?.data?.includes("Password invalid")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password incorrect ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => {})
  }

  if (res?.response?.data?.includes("User not found")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User not found ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => {})
  }


  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  
};
