export const updateToken = () => {
    const user = sessionStorage.getItem("user")

    if (user) {
        const parseUser = JSON.parse(user)
        //console.log(parseUser.token);
        return parseUser.token
    }
}