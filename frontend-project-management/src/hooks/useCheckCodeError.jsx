import Swal from "sweetalert2/dist/sweetalert2.all.js"

export const useCheckCodeError = (res, setDeleteUser, setCheckOk, setUser, setReloadPageError, setRes) => {

    console.log(res);
    // 200 : Todo OK - testCheckOk: true
    if (res?.data?.testCheckOk?.toString() == "true") {
        // Comprobamos que venga del login con el localStorage
        if (localStorage.getItem("user")) {
            const currentUser = localStorage.getItem("user")
            const parseCurrentUser = JSON.parse(currentUser)
            const customUser = {
                ...parseCurrentUser,
                check: true
            }
            // Lo volvemos a meter en el localStorage
            const customUserString = JSON.stringify(customUser)
            setUser(() => customUser)
            localStorage.setItem("user", customUserString)
        }
        setCheckOk(() => true)

        Swal.fire({
            icon: "success",
            title: "Ok correct code ✅",
            showConfirmButton: false,
            timer: 1500,
          });
    }

    // 200: Todo OK - TestCheckOk: false
    if (res?.data?.testCheckOk?.toString() == "false") {
        Swal.fire({
            icon: "error",
            title: "Interval server error ❎.",
            text: "No delete user. Try again, please.",
            showConfirmButton: false,
            timer: 2500,
        });
        setRes(() => {});
    }

    // 200 : Usuario borrado includes('error delete user')
    if (res?.data?.delete?.includes("error delete user")) {
        Swal.fire({
            icon: "error",
            title: "No correct Code ❎.",
            text: "No delete user. Try again, please.",
            showConfirmButton: false,
            timer: 2500,
        });
        setRes(() => {});
    }

    // 200 : Usuario no borrado includes('Ok - user deleted)
    if (res?.data?.delete?.includes("Ok - user deleted")) {
        setDeleteUser(() => true)
        Swal.fire({
            icon: "error",
            title: "No correct Code ❎.",
            text: "Your user is delete. Register again, please.",
            showConfirmButton: false,
            timer: 2500,
        });
        setRes(() => {});
    }

    // 404 : 'User not found' 
    if (res?.response?.data?.includes("User not found")) {
        setReloadPageError(() => true)
        Swal.fire({
            icon: "error",
            title: "Interval server error ❎.",
            text: "No delete user. Try login, please.",
            showConfirmButton: false,
            timer: 1500,
        });
        setRes(() => {});
    }

    // 404 : Random - error.message, de la parte de la actualización del user
    if (res?.response?.status == 404) {
        Swal.fire({
            icon: "error",
            title: "Interval server error ❎.",
            text: "No delete user. Try again, please.",
            showConfirmButton: false,
            timer: 1500,
        });
        setRes(() => {});
    }

    // 500 : Internal Server Error
    if (res?.response?.status == 500) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Interval Server Error ❎!",
            showConfirmButton: false,
            timer: 1500,
        });
        setRes(() => {});
    }
}