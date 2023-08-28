import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { updateTask } from "../services/API/task.service";

export const useUpdateTaskError = (id, setUpdateProjectOk, open) => {
    console.log(open)
    Swal.fire({
        title: `Are you sure you want to ${open ? "open" : "close"} this task?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await updateTask(id)
            switch (res.status) {
                case 200:
                    Swal.fire({
                        icon: "success",
                        title: `${open ? "Open" : "Completed"} Task`,
                        text: "See you soon",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    open ? setUpdateProjectOk(() => false) : setUpdateProjectOk(() => true) 
                    break;
            
                default:
                    Swal.fire({
                        icon: "error",
                        title: `No ${open ? "Open" : "Completed"} Task ❎`,
                        text: "Please, try again",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
            }
        }
    })
}
