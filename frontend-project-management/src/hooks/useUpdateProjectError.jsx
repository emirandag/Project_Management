import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { updateProject } from "../services/API/project.service";

export const useUpdateProjectError = (id, setUpdateProjectOk) => {
    Swal.fire({
        title: "Are you sure you want to close this project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await updateProject(id)
            switch (res.status) {
                case 200:
                    Swal.fire({
                        icon: "success",
                        title: "Closed Project",
                        text: "See you soon",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setUpdateProjectOk(() => true)
                    break;
            
                default:
                    Swal.fire({
                        icon: "error",
                        title: "No delete Project ❎",
                        text: "Please, try again",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
            }
        }
    })
}
