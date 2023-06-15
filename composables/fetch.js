export const useMyFetch = (url, options = {}) => {
    let defaultOptions = {
        headers: {
            Accept: 'application/json'
        }
    }
    if (process.server) {
        defaultOptions.baseURL = process.env.SERVER_DOMAIN
    }
    return useFetch(url, Object.assign(defaultOptions, options))
}
export const useAuthFetch = async (url, options = {}) => {
    const user = useUser()
    // add auth info
    if (user && user.value && user.value.signInUserSession) {
        options.headers = {
                Authorization: 'Bearer ' + user.value.signInUserSession.idToken.jwtToken
            }
    } else {
        console.log('no auth')
    }
    const res = await useMyFetch(url, options)
    if (res.error.value && res.error.value.status === 401) {
        await logout()
    }
    return res
}
