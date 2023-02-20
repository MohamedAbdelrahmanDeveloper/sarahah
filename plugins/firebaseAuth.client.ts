import { initializeApp } from "firebase/app";
import {
    getAuth,
  } from "firebase/auth";

export default defineNuxtPlugin(nuxtApp => {

    const config = useRuntimeConfig();
    console.log(config.apiSecret);
    
    const firebaseConfig = {
      apiKey : config.public.apiKey,
      authDomain : config.public.authDomain,
      databaseURL : config.public.databaseURL,
      projectId : config.public.projectId,
      storageBucket : config.public.storageBucket,
      messagingSenderId : config.public.messagingSenderId,
      appId : config.public.appId,
      measurementId : config.public.measurementId 
    };
      
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    // console.log(app);


  initUser();

  const auth = getAuth();

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);
  
})