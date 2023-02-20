<template>
  <div class="hero min-h-[77vh] md:min-h-[90vh]" >
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <h2 class='text-2xl font-semibold'>Login</h2>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input v-model="user.email" type="email" placeholder="email" name='email' class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input v-model="user.password" type="password" placeholder="password" name='password' class="input input-bordered" required />
              <label class="label">
                <p class="label-text-alt">New to this website? Please <NuxtLink to="/auth/signup" class="link link-hover font-bold text-primary">sign up.</NuxtLink></p>
              </label>
            </div>
            <div v-if="error" class="label-text-alt alert alert-error text-red-900 shadow-lg p-2 rounded-md">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{{ error }}</span>
                </div>
            </div>
            <div class="form-control">
              <button @click="Login" class="btn btn-primary">Login</button>
              <label class="label flex justify-end">
                <NuxtLink to="/auth/forgot" class="label-text-alt font-bold link link-hover text-primary">Forgot Password?</NuxtLink>
              </label>
            </div>
          </div>
        </div>
      </div>
  </template>
  <script setup>
definePageMeta({
  middleware: ["signedout"]
})
  let error = ref(false);
  let user = {
    email: '',
    password: '',
    time: new Date()
  }
  async function Login () {
    let time = user.time.toString()
    await signInUser(user.email, user.password, time).then(async (e)=> {
      if (e === "Done") {
        // const router = useRouter();
        // router.push("/messages")
        await navigateTo('/messages')
        // location.reload()
      } else {
        error.value = e
      }
    });
  }
  </script>