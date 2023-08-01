export const updateToken = () => {
    const user = sessionStorage.getItem("user")

    if (user) {
        const parseUser = JSON.parse(user)
        return parseUser.token
    }
}