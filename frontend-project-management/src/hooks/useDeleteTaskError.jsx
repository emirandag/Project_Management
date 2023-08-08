import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteTask } from "../services/API/task.service";

export const useDeleteTaskError = (id, setDeleteTaskOk) => {
    console.log(id);
    Swal.fire({
        title: "Are you sure you want to delete this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await deleteTask(id)
            switch (res.status) {
                case 200:
                    Swal.fire({
                        icon: "success",
                        title: "Delete task",
                        text: "See you soon",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setDeleteTaskOk(() => true)
                    break;
            
                default:
                    Swal.fire({
                        icon: "error",
                        title: "No delete Task ❎",
                        text: "Please, try again",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
            }
        }
    })
}
