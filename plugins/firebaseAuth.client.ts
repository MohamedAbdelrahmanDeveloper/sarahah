import { initializeApp } from "firebase/app";
import {
    getAuth,
  } from "firebase/auth";

export default defineNuxtPlugin(nuxtApp => {

    const config = useRuntimeConfig();

    const firebaseConfig = {
      apiKey : config.apiKey,
      authDomain : config.authDomain,
      databaseURL : config.databaseURL,
      projectId : config.projectId,
      storageBucket : config.storageBucket,
      messagingSenderId : config.messagingSenderId,
      appId : config.appId,
      measurementId : config.measurementId 
    };
      
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    // console.log(app);


  initUser();

  const auth = getAuth();

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);
  
})