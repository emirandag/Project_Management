import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteMemberProject } from "../services/API/project.service";

export const useDeleteMemberProjectError = (id, email, setDeleteMemberOk) => {

    console.log(id);
    console.log(email);
    Swal.fire({
        title: "Are you sure you want to delete this member?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await deleteMemberProject(id, email)
            switch (res.status) {
                case 200:
                    Swal.fire({
                        icon: "success",
                        title: "Delete Member",
                        text: "See you soon",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setDeleteMemberOk(() => true)
                    break;
            
                default:
                    Swal.fire({
                        icon: "error",
                        title: "No delete Member ❎",
                        text: "Please, try again",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    break;
            }
        }
    })
}
