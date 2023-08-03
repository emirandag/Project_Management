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
};
