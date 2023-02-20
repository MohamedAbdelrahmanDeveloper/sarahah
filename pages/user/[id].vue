<template>
  <div class="py-10">
    <div v-if="user" class="max-w-3xl mx-auto card shadow-xl">
      <Head>
        <Title>Sarahah - {{user.displayName}}</Title>
        <meta name="description" :content="user.bio.data"/>
        <Meta name="twitter:image:src" :content="user.photoURL" />
        <Meta name="twitter:site" :content="user.uid" />
        <Meta name="twitter:card" content="summary" />
        <Meta name="twitter:title" :content="user.displayName" />
        <Meta name="twitter:description" :content="user.bio.data" />
        <Meta property="og:image" :content="user.photoURL" />
        <Meta property="og:image:alt" :content="user.bio.data" />
        <Meta property="og:site_name" :content="user.displayName" />
        <Meta property="og:type" content="profile" />
        <Meta property="og:title" :content="user.displayName" />
        <Meta property="og:url" content="" />
        <Meta property="og:description" :content="user.bio.data" />
        <Meta property="profile:username" :content="user.displayName" />
      </Head>
      <div class="profile p-5 ">
        <div class="flex flex-col items-center">
            <div class="avatar" :class="{ 'offline': !isOnline, 'online': isOnline }">
              <div class="w-32 h-32 md:w-40 md:h-40 rounded-full">
                <img :src="user.photoURL" />
              </div>
            </div>
            <div class="flex flex-col items-center text-center">
              <h2 class="text-xl font-medium my-1 mt-2">{{ user.displayName }}</h2>
              <p class="w-3/5">{{ user.bio.data }}</p>
              <span class="opacity-70 mb-2">{{ time_ago }}</span>
            </div>
          </div>
          <form @submit.prevent="sendMessage" class="relative" accept-charset="utf-8">
          <textarea @click="success = false,error = false" v-model="message" placeholder="write your message .." class="textarea textarea-primary w-full"
            name="message" rows="5"></textarea>
          <div class="alert alert-error shadow-lg" v-if="error">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{error}}</span>
            </div>
          </div>
          <div class="alert alert-success shadow-lg" v-if="success">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{success}}</span>
            </div>
          </div>
          <a @click="message = ''" v-if="message.length >= 4"
            class="btn btn-error absolute top-1 right-1">Clear</a>
          <div class="flex justify-between items-center mt-1">
            <button :disabled="message.length < 4" type="submit" class="btn btn-primary" >Send message</button>
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">anonymous</span>
              <img src="https://firebasestorage.googleapis.com/v0/b/sarahah-e135d.appspot.com/o/userPhoto%2Fuser.png?alt=media&token=5a615b54-e7cc-47bb-ad39-e4ab13e5f428" class="w-6 h-6 rounded-full" alt="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  
    <div class="h-[83vh] flex flex-col justify-center items-center gap-y-3 text-2xl text-gray-500" v-else>
      <div v-if="notFoundUser">
        <div>Sorry Not found user ..! <MyNuxtLink class="link link-primary" to="/">Home</MyNuxtLink></div>
      </div>
      <div v-else class="w-2/4">
        <progress class="progress progress-primary"></progress>
      </div>
    </div>
  </div>
</template>
<script>
// ميدل وير هنا
export default {
  data() {
    return {
      user: null,
      message: "",
      notFoundUser: false,
      error: false,
      success: false,
      time: new Date()
    };
  },
  methods: {
    sendMessage() {
      if (this.message.length >= 4) {
        let time = this.time.toString()
        sendMessageToUser(this.user.uid, this.message, time).then(e => {
          if (e === 'Please Write message .') {
            this.error = e;
            this.success = false;
          }
          else if (e === 'You cannot send a message to yourself') {
            this.error = e;
            this.success = false;
          }
          else {
            this.success = 'The message has been sent successfully';
            this.error = false;
          }
        });
      } else {
        this.success = false;
        this.error = 'Please enter a message greater than 4 characters';
      }
    },
    selectedMesaage(e) {
      let mess = e.target.textContent
      this.message = mess
    },
    moment(time) {
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
  },
  computed: {
    time_ago() {
      return this.moment(this.user ? this.user.time.lastTime : 'ko')
    },
    isOnline() {
      let time = this.moment(this.user ? this.user.time.lastTime : 'ko')
      return time.match(/1 minute|Just now|seconds/) ? true : false
    }
  },
  async mounted() {
    let id = this.$route.params.id
    if (id === "m7md0a") {
      await getUser('NbQM3zD8MHgWJeN32fOxw5HKStr1').then((e) => {
        if (typeof e === "object") {
          e.uid = "NbQM3zD8MHgWJeN32fOxw5HKStr1";
          this.user = e;
        }
        if (typeof e === "string") {
          this.notFoundUser = true
        }
      });
    } else {
      await getUser(this.$route.params.id).then((e) => {
        if (typeof e === "object") {
          e.uid = this.$route.params.id;
          this.user = e;
        }
        if (typeof e === "string") {
          this.notFoundUser = true
        }
      });
    }
  },
};
</script>