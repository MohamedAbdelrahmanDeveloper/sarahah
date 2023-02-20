<template>
    <Head>
        <Title>Sarahah - Messages</Title>
    </Head>
    <div class="py-5">
        <div class="max-w-3xl mx-auto md:p-5">
            <div v-if="typeof messages === 'object'" class="profile flex flex-col space-y-4">
                <div v-for="idKey in keuss" :key="idKey" class="card md:p-2 shadow-md">
                    <div class="card-body">
                        <div class="flex flex-row items-center space-x-4 text-base">
                            <div class="avatar">
                                <div class="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="../assets/img/user.png" />
                                </div>
                            </div>
                            <!-- <div class="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                                <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                                <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                                </svg>

                            </div> -->
                            <div class="flex flex-row justify-between w-full">
                                <span class="font-">Anonymous</span>
                                <div v-if="time_ago(messages[idKey].time).match(/minute|Just now|seconds/)" class="badge bg-green-500 border-none">New</div>
                            </div>
                        </div>
                        <div :class="{'text-right arabic' : /[\u0600-\u06FF]/.test(messages[idKey].message)}" class="text-left my-6">
                            <p class="text-base leading-7 break-words">
                                {{messages[idKey].message}}
                            </p>
                        </div>
                        <div class="card-actions justify-between px-k4">
                            
                            <span class="text-sm opacity-70">{{ time_ago(messages[idKey].time) }}</span>
                            <label :for="idKey" class="text-red-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                                </svg>
                            </label>
                            <!-- Put this part before </body> tag -->
                            <input type="checkbox" :id="idKey" class="modal-toggle" />
                            <div class="modal">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">Are you sure?</h3>
                                <p class="py-4">Do you want to delete this message ?</p>
                                <div class="modal-action">
                                <label :for="idKey" class="btn btn-success">no</label>
                                <label :for="idKey" @click="deleteThisMessage(idKey)" class="btn btn-error">Yes i'm sure</label>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hero min-h-[50vh]" v-else-if="messages === 'no'">
                There are no messages yet
            </div>
            <div v-else class="w-2/4 hero min-h-[50vh]">
                <progress class="progress progress-primary"></progress>
            </div>
        </div>
    </div>
</template>
<!-- <script setup>
definePageMeta({
  middleware: ["auth"],
});
</script> -->

<script>


import {
  getAuth
} from "firebase/auth";
// definePageMeta({
//     middleware: ["auth"],
// });
export default {
    // middleware: ['auth'],
    data() {
        return {
            messages: false,
            keuss: false
        }
    },
    methods: {
        time_ago(time) {
            switch (typeof time) {
                case "number":
                    break;
                case "string":
                    time = +new Date(time);
                    break;
                case "object":
                    if (time.constructor === Date) time = time.getTime();
                    break;
                default:
                    time = +new Date();
            }
            var time_formats = [
                [60, "seconds", 1], // 60
                [120, "1 minute ago", "1 minute from now"], // 60*2
                [3600, "minutes", 60], // 60*60, 60
                [7200, "1 hour ago", "1 hour from now"], // 60*60*2
                [86400, "hours", 3600], // 60*60*24, 60*60
                [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
                [604800, "days", 86400], // 60*60*24*7, 60*60*24
                [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
                [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
                [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
                [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
                [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
                [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
                [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
                [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
            ];
            var seconds = (+new Date() - time) / 1000,
                token = "ago",
                list_choice = 1;

            if (seconds == 0) {
                return "Just now";
            }
            if (seconds < 0) {
                seconds = Math.abs(seconds);
                token = "from now";
                list_choice = 2;
            }
            var i = 0,
                format;
            while ((format = time_formats[i++]))
                if (seconds < format[0]) {
                    if (typeof format[2] == "string") return format[list_choice];
                    else
                        return (
                            Math.floor(seconds / format[2]) + " " + format[1] + " " + token
                        );
                }
            return time;
        },
        async deleteThisMessage(id) {
            await deleteMessage(id).then(async (e) => {
                this.getMessages();
            });
        },
        getMessages() {
            $fetch("/api/me", {
                method: "GET",
            })
            .then((e) => {
                if (e != "There are no messages yet") {
                    this.messages = JSON.parse(e)
                    this.keuss = Object.keys(JSON.parse(e)).reverse();
                }
                else {
                    this.messages = 'no'
                }
            });
        }
    },
    mounted() {
        setTimeout(() => {
            let auth = getAuth()
            if (auth.currentUser === null) {
                const router = useRouter();
                router.push({ path: "/auth/login" });
            }
            else {
                this.getMessages()
            }
        }, 400);
    }
}
</script>