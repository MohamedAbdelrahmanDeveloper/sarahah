// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules : ['@nuxtjs/tailwindcss'],
    runtimeConfig: {
        // The private keys which are only available within server-side
        apiSecret : process.env.apiKey,
        // Keys within public, will be also exposed to the client-side
        public: {
            apiKey : process.env.apiKey,
            authDomain : process.env.authDomain,
            databaseURL : process.env.databaseURL,
            projectId : process.env.projectId,
            storageBucket : process.env.storageBucket,
            messagingSenderId : process.env.messagingSenderId,
            appId : process.env.appId,
            measurementId : process.env.measurementId 
        }
    },

})
