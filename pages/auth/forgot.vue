<template>
    <div class="hero min-h-[77vh] md:min-h-[90vh]" >
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h2 class='text-2xl font-semibold'>Forgot Password</h2>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="user.email" type="email" placeholder="email" name='email' class="input input-bordered" required />
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
            <div v-if="success" class="label-text-alt alert alert-success text-base-100 shadow-lg p-2 rounded-md">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{{ success }}</span>
                  </div>
              </div>
          <div class="form-control mt-2">
              <button @click="forgotMyPassword" class="btn btn-primary">Send</button>
              <label class="label">
                <p class="label-text-alt">Do you remember the password? Please <NuxtLink to="/auth/login" class="link link-hover font-bold text-primary">Login</NuxtLink></p>
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

let success = ref(false);
let error = ref(false);
  let user = {
    email: ''
  }
  async function forgotMyPassword () {
    if (user.email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      await forgotPassword(user.email).then(async (e)=> {
        if (e === 'Done') {
          success.value = e
          error.value = false
        } else {
          success.value = false
          error.value = e
        }
      });
    } else {
      success.value = false
      error.value = 'please write your email'
    }
  }
</script>