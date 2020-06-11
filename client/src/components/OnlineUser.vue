<template>
  <v-row align="center">
    <v-form
      ref="form"
    >
      <v-text-field
        label="Type here"
      ></v-text-field>

      <v-btn
        color="green"
      >
        Send
      </v-btn>
    </v-form>
  </v-row>
</template>
<script>
import io from 'socket.io-client'

export default {
  data: function () {
    return {
      username: '',
      socket: io('http://localhost:5000'),
      messages: [],
      users: []
    }
  },
  methods: {
    JoinServer: function () {
      this.socket.on('loggedIn', data => {
        this.messages = data.messages
        this.users = data.users
        this.socket.emit('newuser', this.username)
      })
    }
  },
  mounted: function () {
    this.username = prompt('What is your user name?', 'Anonymous')

    if (!this.username) {
      this.username = 'Anonymous'
    }

    this.JoinServer()
  }
}
</script>
