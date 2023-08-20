import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useAddCommentError = (res, setRes) => {
    console.log(res);
    // 200 --->  respuesta ok register ok
    if (res?.status == 201) {
      // const dataToString = JSON.stringify(res);
      // sessionStorage.setItem("data", dataToString);
      //setAddCommentOk(() => comments);
  
      Swal.fire({
        icon: "success",
        title: "Comment has been to Task",
        showConfirmButton: false,
        timer: 1500,
      });
      //setRes({});
    }
}
