<template>
    <div class="min-h-[77vh] md:min-h-[90vh]" v-if="user" >
        <Head>
            <Title>Sarahah - {{user.displayName}}</Title>
            <Meta name="description" :content="user.bio.data" />
        </Head>
        <div class="card max-w-2xl mx-auto bg-base-100 shadow-xl mt-14" v-if="user.bio">
            <div class="p-4 -mb-5 flex justify-end">
                <svg class="w-6 h-6" @click="isEidtro = !isEidtro" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                </svg>
            </div>
            <figure class="px-10 pt-10">
                <!-- <img src="../assets/img/user.png" alt="No img" class="rounded-full w-44 ,bg-green-400" /> -->
                <img :src="user.photoURL" alt="No img" class="rounded-full w-32 h-32 md:w-40 md:h-40 bg-green-400" />
                <!-- <img :src="imggg2" alt="No img" class="rounded-full w-44 ,bg-green-400" /> -->
            </figure>
            <div class="card-body items-center text-center space-y-1">
                <div v-if="isEidtro" class="flex flex-col space-y-2">
                    <input ref="inputFile" @change="getFileImg" type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                </div>
                <h2 class="card-title">{{ user.displayName }}</h2>
                <div v-if="isEidtro" class="flex flex-col space-y-2">
                    <input v-model="user.displayName" type="text" placeholder="Write Name" class="input input-bordered input-primary w-full max-w-xs" />
                </div>
                <p class="w-4/6">{{ user.bio ? user.bio.data : 'No bio' }}</p>
                <div v-if="isEidtro" class="flex flex-col space-y-2">
                    <textarea v-model="user.bio.data" class="textarea textarea-primary" placeholder="Bio"></textarea>
                    <div>
                        <button @click="updateData" class="btn btn-primary">Save</button>
                    </div>
                </div>
                <div class="card-actions flex">
                    <input id="inputLink" class="input input-bordered input-primary " v-show="isEidtro" >
                    
                    <button @click="copyLink" class="btn btn-primary space-x-2">
                        <svg fill="none" class="w-6 h-6" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"></path>
                        </svg>
                        <span>Copy link</span>
                    </button>
                </div>
            </div>

            <div class="stats shadow">
                <MyNuxtLink to="/messages" class="stat place-items-center">
                    <div class="stat-value">{{ countMessages }}</div>
                    <div class="stat-title">Messages</div>
                </MyNuxtLink>
            </div>

        </div>
        <div class="hero min-h-[50vh]" v-else>
            loading ..
        </div>
    </div>
</template>

<script>
// definePageMeta({
//     middleware: ["auth"],
// });
export default {
    // middleware: ['auth'],
    data(){
        return {
            user :false ,
            isEidtro: false,
            imggg : '/_nuxt/assets/img/user.png',
            imggg2 : '/_nuxt/assets/img/anonymous.jpg',
            countMessages: 0,
            imgFile: [],
            // inputCopy : `${location.origin}/user/${this.user && this.user}`
        }
    },
    methods : {
        getUser (){
            $fetch("/api/auth", {
                method: "GET",
            })
            .then((e) => {
                let m = JSON.parse(e)
                this.user = m
            });
            $fetch("/api/me", {
                method: "GET",
            })
            .then((e) => {
                if (e != "There are no messages yet") {
                    let m = Object.keys(JSON.parse(e))
                    this.countMessages = m.length;
                }
                else {
                    this.countMessages = 0
                }
            });
        },
        async editBio (){
            this.isEidtro = false
        },
        updateData() {
            // this.updateImg()
            if (this.imgFile.length > 0) {
                let newData = this.user;
                updateUserDataWithImg(newData.displayName, this.imgFile[0], newData.bio.data)
                this.isEidtro = false
                setTimeout(() => {
                    location.reload()
                }, 5000);
            }
            else {
                let newData = this.user;
                updateUserData(newData.displayName, newData.photoURL, newData.bio.data)
                this.isEidtro = false
                setTimeout(() => {
                    location.reload()
                }, 5000);
            }
        },
        updateImg() {
            if (this.imgFile) {
                console.log('upp');
                updateFile(this.imgFile[0])
            }
        },
        getFileImg(e){
            this.imgFile = this.$refs.inputFile.files
        },
        copyLink() {
            var copyText = document.getElementById("inputLink");
            copyText.value = `${location.origin}/user/${this.user.uid}`
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
        }
    },
    mounted(){
        $fetch("/api/auth", {
            method: "GET",
        })
        .then((e) => {
            if (e === 'User is signed out') {
                console.log(e);
                const router = useRouter();
                router.push({ path: "/auth/login" });
            }
            else {
                this.getUser();
                setTimeout(() => {
                    if (this.user) {
                        var copyText = document.getElementById("inputLink");
                        copyText.value = `${location.origin}/user/${this.user.uid}`
                    }
                }, 1000);
            }
        });
    }
}
</script>