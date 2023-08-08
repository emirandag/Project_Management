import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useAddUserProjectError = (resUser, setRes, setConfirmUserProjectOk) => {
    console.log(resUser);
    // 200 --->  respuesta ok register ok
    if (resUser?.status == 201) {
      // const dataToString = JSON.stringify(res);
      // sessionStorage.setItem("data", dataToString);
      setConfirmUserProjectOk(() => true);
  
      Swal.fire({
        icon: "success",
        title: "User has been added to Project 📂",
        showConfirmButton: false,
        timer: 1500,
      })
      //setRes({});
    }
  
    if (resUser?.response?.data?.includes("The member is not add to the project")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error. The member is not add to the project ❎",
        showConfirmButton: false,
        timer: 3000,
      });
      setRes({});
      }
  
    if (resUser?.response?.data?.includes("This email not exist")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error. Try an another email user ❎",
        showConfirmButton: false,
        timer: 3000,
      });
      setRes({});
      }
  
    if (resUser?.response?.data?.includes("This user already in project")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This user already in project. Try an another user ❎",
        showConfirmButton: false,
        timer: 3000,
      });
      setRes({});
      }
  
    if (resUser?.response?.status == 500) {
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