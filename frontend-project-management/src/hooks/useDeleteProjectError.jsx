import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteProject } from "../services/API/project.service";

export const useDeleteProjectError = (id, setDeleteProjectOk) => {
    //console.log(id);
    Swal.fire({
        title: "Are you sure you want to delete this project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await deleteProject(id)
            switch (res.status) {
                case 200:
                    Swal.fire({
                        icon: "success",
                        title: "Delete Project",
                        text: "See you soon",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setDeleteProjectOk(() => true)
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
