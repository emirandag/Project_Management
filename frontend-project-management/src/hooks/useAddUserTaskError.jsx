import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { addUserTask } from "../services/API/task.service";

export const useAddUserTaskError = (id, email, setAddUserOk) => {
  //   console.log(res);
  //   console.log(email);

  Swal.fire({
    title: "Are you sure you want to assigne to you this task?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await addUserTask(id, email);
      console.log(res)
      if (res.status == 200) {
        Swal.fire({
                    icon: "success",
                    title: "Task assigned to you",
                    text: "See you soon",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  //setRes({})
                  setAddUserOk(() => true);
      }

      if (res.response.data.includes("The user is not in the project associated with the task")) {
        Swal.fire({
                    icon: "error",
                    title: "You are not a member of the project",
                    text: "See you soon",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setRes({})
      }

      if (res.status == 500) {
        Swal.fire({
        
                        icon: "error",
                        title: "No task assigned to you ❎",
                        text: "Please, try again",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                  setRes({})
      }
    //   console.log(res)
    //   switch (res.status) {
        
    //     case 200:
    //       Swal.fire({
    //         icon: "success",
    //         title: "Task assigned to you",
    //         text: "See you soon",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       //setRes({})
    //       setAddUserOk(() => true);
    //       break;

    //     case 404:
    //       Swal.fire({
    //         icon: "error",
    //         title: "You are not a member of the project",
    //         text: "See you soon",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       //setRes({})
    //       setAddUserOk(() => true);
    //       break;

    //     default:
    //       Swal.fire({
    //         icon: "error",
    //         title: "No task assigned to you ❎",
    //         text: "Please, try again",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       break;
    //   }
    }
  });
};
