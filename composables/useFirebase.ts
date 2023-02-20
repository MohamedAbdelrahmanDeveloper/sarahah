//https://firebase.google.com/docs/auth/web/start

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";

// @ts-ignore
import { getDatabase, ref, set, push, child, get, remove } from "firebase/database";

// @ts-ignore
import { getStorage, ref as mm,getDownloadURL,uploadBytesResumable } from "firebase/storage";




export const createUser = async (name: string, email: string, password: string, time: string) => {
  const auth = getAuth();
  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/sarahah-e135d.appspot.com/o/userPhoto%2Fuser.png?alt=media&token=5a615b54-e7cc-47bb-ad39-e4ab13e5f428";
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).then((e) => {
    // edit name and photo
    const auth = getAuth();
    set(ref(getDatabase(), 'users/' + auth.currentUser?.uid), {
      displayName: name,
      // email: email,
      photoURL: imageUrl,
      time : {
        lastTime : time
      },
      bio : {
        data : 'Hi'
      },
    });
    // @ts-ignore
    let editNameAndPhoto = updateProfile(auth.currentUser, {
      displayName: name, photoURL: imageUrl
    }).then(() => {
      // initUser()
      return "Done";
    }).catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      return errorCode
    });
    return editNameAndPhoto
  }).catch((error) => {
    const errorCode = error.code;
    // const errorMessage = error.message;
    return errorCode
  });
  return credentials;
};

export const signInUser = async (email: string, password: string,time: string) => {
  const auth = getAuth();
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).then(e => {
    const auth = getAuth();    
    set(ref(getDatabase(), 'users/'+ auth.currentUser?.uid +'/time'), {
      lastTime : time
    });
    // initUser()
    // location.reload()
    return 'Done';
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorCode
  });

  return credentials;
};


export const forgotPassword = async (email:string) => {
  const auth = getAuth();
  let result = sendPasswordResetEmail(auth, email)
    .then((e) => {
      return 'Done'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode
    });
  return result
};

export const initUser = async () => {  
  const auth = getAuth();
  const firebaseUser = useFirebaseUser();
  // @ts-ignore 
  firebaseUser.value = auth.currentUser;

  const userCookie = useCookie("userCookie");
  const userMessagesCookie = useCookie("userMessagesCookie");

  // const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // @ts-ignore
      // userCookie.value = user; //ignore error because nuxt will serialize to json
      getUser(user.uid).then( e => {
        e.uid = user.uid
        // @ts-ignore
        userCookie.value = e; //ignore error because nuxt will serialize to json
      })
      readMessages(user.uid).then(e => {
        // console.log(this.me.uid);
        // @ts-ignore
        userMessagesCookie.value = e;
      })    
    } else {
      //if signed out
      // firebaseUser.value = user
      // router.push("/");
      userMessagesCookie.value = null;
      // @ts-ignore
      userCookie.value = user; //ignore error because nuxt will serialize to json
      
    }
    
    // @ts-ignore
    firebaseUser.value = user;

    // $fetch("/api/auth", {
    //   method: "POST",
    //   body: { user },
    // });
  });
};


export const signOutUser = async () => {
  const auth = getAuth();
  const result = await auth.signOut();
  return result;
};

export const sendMessageToUser = async (userId: string, message: string, time: string) => {
  const auth = getAuth();
  if (userId === auth?.currentUser?.uid) {
    return 'You cannot send a message to yourself'
  } else {
    if (message === '') {
      return 'Please Write message .'
    }
    else {
      const db = getDatabase();
      console.log(time);
      return set(push(ref(db, 'messages/' + userId)), {
        message,
        time
      }).then(e => {
        console.log(e);
        return e
      });
    }
  }
}

export const readMessages = async (userId: string) => {
  const dbRef = ref(getDatabase());
  // @ts-ignore
  let data = await get(child(dbRef, `messages/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
     return snapshot.val()
    } else {
      return null
    }
  }).catch((error) => {
    console.error(error);
  });
  return data
}

export const deleteMessage = async (uid: string) => {
  const auth = getAuth();
    const db = getDatabase();
    const postRef = ref(db, '/messages/'+ auth?.currentUser?.uid +'/'+ uid);
    return remove(postRef).then(e=> {
      // location.reload()
      initUser()
      return 'Done'
    })
    // runTransaction(postRef, (post) => {
    //   console.log(post);
    //   post.remove()
    //   return post;
    // });
}

export const getUser = async (userId: string) => {
  const db = getDatabase();
  const dbRef = ref(db);
  let user = get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "No data available"
    }
  }).catch((error) => {
    console.error(error);
  });
  return user;
}

export const updateUserData = async (name: string, imageUrl: string, bio: string) => {
    const auth = getAuth();
    // @ts-ignore
    let editNameAndPhoto = updateProfile(auth.currentUser, {
      displayName: name, photoURL: imageUrl
    }).then(() => {
      set(ref(getDatabase(), 'users/' + auth.currentUser?.uid), {
        displayName: name,
        // email: email,
        photoURL: imageUrl,
        time : {
          lastTime : new Date().toString()
        },
        bio : {
          data : bio
        },
      });
      initUser();
      return "Done";
    }).catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      return errorCode
    });
    return editNameAndPhoto

}

export const updateUserDataWithImg = async (name: string, file: any, bio: string) => {
  const auth = getAuth();
  const storage = getStorage();
  // @ts-ignore
  const imagesRef = mm(storage, 'userPhoto/'+auth.currentUser.uid, 'images');
  // @ts-ignore
  // uploadBytes(imagesRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });
  const uploadTask = uploadBytesResumable(imagesRef, file);
  
  const resulte = uploadTask.on('state_changed', 
    (snapshot) => {},
    (error) => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
        // @ts-ignore
        updateUserData(name, imageUrl, bio)
      });
  })
  return resulte;
}