import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useAddMemberProjectError = (res, setRes, setAddMemberOk) => {
  console.log(res);
  // 200 --->  respuesta ok register ok
  if (res?.status == 200) {
    // const dataToString = JSON.stringify(res);
    // sessionStorage.setItem("data", dataToString);
    setAddMemberOk(() => true);

    Swal.fire({
      icon: "success",
      title: "Member has been to Project 📂",
      showConfirmButton: false,
      timer: 1500,
    });
    //setRes({});
  }

  if (res?.response?.data?.includes("The member is not add to the project")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error. The member is not add to the project ❎",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
    }

  if (res?.response?.data?.includes("This email not exist")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error. Try an another email user ❎",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
    }

  if (res?.response?.data?.includes("This user already in project")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This user already in project. Try an another user ❎",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
    }

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
};
