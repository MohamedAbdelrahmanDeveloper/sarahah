<template>
    <Head>
        <Title>Sarahah - {{ title }}</Title>
    </Head>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">Sarahah</NuxtLink>
        </div>
        <div class="flex-none space-x-2">
            <ul class="menu menu-horizontal px-1 space-x-2">
                <li v-if="!user" class="space-x-2">
                    <MyNuxtLink to="/auth/login">Login</MyNuxtLink>
                    <MyNuxtLink to="/auth/signup">Sign Up</MyNuxtLink>
                </li>
            </ul>

            <div class="dropdown dropdown-end" v-if="user">
                <label tabindex="0" class="btn btn-ghost  flex space-x-2 items-center">
                    <div>
                        {{ user? limit(user.displayName.split(' ')[0], 8) : ''}}
                    </div>
                    <div class="avatar">
                        <div class="w-8 rounded-full">
                            <img :src="user.photoURL" />
                        </div>
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                    <div class="p-2">
                        Hello <span class="font-bold">{{ user? limit(user.displayName.split(' ')[0], 8) : ''}}</span>
                    </div>
                    <li><MyNuxtLink to="/messages">Messages</MyNuxtLink></li>
                    <li><MyNuxtLink to="/profile">Profile</MyNuxtLink></li>
                    <li><a @click="Logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: false,
        }
    },
    methods: {
        async Logout() {
            await signOutUser();
            await navigateTo('/auth/login')
            location.reload();
        },
        getUser() {
            this.user = useFirebaseUser() ? useFirebaseUser() : false
        },
        limit (string = '', limit = 0) {  
            return string.substring(0, limit)
        }
    },
    computed : {
        title () {
            return this.$route.matched[0].components.default.__name ? this.$route.matched[0].components.default.__name.charAt(0).toUpperCase() + this.$route.matched[0].components.default.__name.slice(1) : 'Home';
        }
    },
    mounted() {
        this.getUser();
    }
}


</script>