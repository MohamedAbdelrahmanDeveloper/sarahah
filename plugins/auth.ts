
export default defineNuxtPlugin(() => {
    // addRouteMiddleware('auth', () => {
    //     $fetch("/api/auth", {
    //         method: "GET",
    //     })
    //     // @ts-ignore
    //     .then((e) => {
    //         if (e === 'User is signed out') {
    //             return navigateTo('/')
    //         }
    //     });
        
        // const { $auth } = useNuxtApp()
        // if(!$auth?.currentUser?.uid) {
        //     return navigateTo('/')
        // }
    // })

    addRouteMiddleware('signedout', (to , from) => {
        // console.log(to);
        
        $fetch("/api/auth", {
            method: "GET",
        })
        // @ts-ignore
        .then((e) => {
            if (e != 'User is signed out') {
                return navigateTo('/')
            }
        });

        // const { $auth } = useNuxtApp()
        // console.log($auth);
        // if($auth?.currentUser?.uid) {
        //     return navigateTo('/')
        // }
    })
})