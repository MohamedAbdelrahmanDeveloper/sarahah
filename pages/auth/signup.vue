<template>
    <div class="hero min-h-[77vh] md:min-h-[90vh]">
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <h2 class='text-2xl font-semibold'>Sign Up</h2>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input v-model="user.name" type="text" placeholder="Your name" name='name'
                        class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input v-model="user.email" type="email" placeholder="Your email" name='email'
                        class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input v-model="user.password" type="password" placeholder="***********" name='password'
                        class="input input-bordered" required />
                    <label class="label">
                        <p class="label-text-alt">Already have an account? Please
                            <NuxtLink to="/auth/login" class="font-bold link link-hover text-primary">login.</NuxtLink>
                        </p>
                    </label>
                    <div v-if="error" class="label-text-alt alert alert-error text-red-900 shadow-lg p-2 rounded-md">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Sorry {{ error }}</span>
                        </div>
                    </div>
                    <div v-if="success" class="label-text-alt alert alert-success text-base-100 shadow-lg p-2 rounded-md">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{{ success }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-control mt-2">
                    <button class="btn btn-primary" @click="signup">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ["signedout"]
})
const success = ref(false);
const error = ref(false);
let user = {
    name: '',
    email: '',
    password: '',
    time: new Date()
}
async function signup() {
    let time = user.time.toString()
    if (user.email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        await createUser(user.name, user.email, user.password, time)
        .then(async e => {
            if(e === "Done") {
                success.value = 'Your account has been created successfully';
                error.value = false
                // location.reload();
                await navigateTo('/')
            }
            else if (e === "auth/email-already-in-use") {
                success.value = false;
                error.value = 'Email is in use';
            }
            else {
                success.value = false;
                error.value = e;
            }
        })
    }
    else {
        success.value = false;
        error.value = 'Please enter valid e-mail';
    }
}

</script>