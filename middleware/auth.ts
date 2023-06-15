import { Auth }  from 'aws-amplify';

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('auth middleware')
    const user = useUser()
    const signInPath = '/account/signin'
    if (!user.value && to.path !== signInPath) {
        try {
            const authUser = await Auth.currentAuthenticatedUser()
            console.log(authUser)
            setUser(authUser)
        } catch (e) {
            console.log(e)
            return navigateTo({
                path: signInPath,
                query: {
                    callback: encodeURIComponent(to.fullPath)
                }
            })
        }
    } else {
        console.log(user.value)
    }
})
