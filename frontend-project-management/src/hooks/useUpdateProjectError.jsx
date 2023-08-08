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
            console.log(res);
            
               
            if (res?.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Closed Project",
                    text: "See you soon",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setUpdateProjectOk(() => true)
            }
                    
                
            if (res?.response?.data?.includes("Error - In the project, there are still open tasks")) {
                Swal.fire({
                    icon: "error",
                    title: "Is not closed the project. There are open tasks",
                    text: "See you soon",
                    showConfirmButton: false,
                    timer: 1500,
                });
                        //setUpdateProjectOk(() => true)
                    }
                    

                    if (res?.response?.status == 500) {
                        Swal.fire({
                            icon: "error",
                            title: "Upss, error internal",
                            text: "See you soon",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        
                    }

                    
        }
    })
}
