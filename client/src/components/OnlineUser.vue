<template id="chat">
  <v-row align="center">
    <div class="chat-window">
      <div class="messages">
        <!-- the {{message.mg }} is suppose to load the messege here in the div from the div class message-text
        when you press send but it doesnt and it escape to the dashboard after pressing send -->
          <div class="message"
            v-for="message in messages"
            :key="message.index"
          >
          <div class="username">{{ message.username }}</div>
          <div class="message-text"> {{ message.msg }}</div>
        </div>
      </div>
    <form class="input-container"
      v-on:submit="sendMessage"
    >
      <input
        type="text"
        v-model="msg"
      >

      <button class="sndButton"
        color="green"
        v-on:click="sendMessage" v-on:disabled="msg"
      >
        Send
      </button>
    </form>
    </div>
  </v-row>
</template>
<script>
export default {
  props: ['messages'],
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    sendMessage () {
      // if (!this.msg) {
      //   alert('Please enter message')
      // }
      // this.$emit('sendMessage', this.msg)
      console.log(this.msg)
      this.msg = ''
    }
  }
}
</script>
<style>
/* #chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
} */
.chat-window {
 display: flex;
  flex-direction: column;
  height: 40vh;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  background-color:lightslategrey;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);
}
/* .chat-window {
  flex: 1;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  background-color: grey;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);
} */
.messages {
  flex: 1
}
.message {
  /* display: flex; */
  border-bottom: 1px solid purple;
  padding: 10px;
}
.username {
  width: 100px;
  margin-right: 15px;
}
form {
  display: flex;
}
input {
  flex: 1;
  height: 35px;
  font-size: 38px;
  background-color:white;
  border: 1px solid black;
  box-sizing: border-box;
}
.sndButton {
  width: 75px;
  height: 35px;
  box-sizing: border-box;
  background-color:white;
  border: 1px solid black;
}
.message-text {
  height: 35px;
  background-color:orangered;
}
</style>
