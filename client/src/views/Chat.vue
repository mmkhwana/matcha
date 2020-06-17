<template>
  <v-container>
    <v-card
      height="400"
    >
      <v-row>
      <v-col cols="3">
        <v-navigation-drawer
          v-model="drawer"
          :expand-on-hover="expandOnHover"
          :mini-variant="miniVariant"
          :right="right"
          :src="bg"
          color="deep-purple lighten-3"
          dark
        >
          <v-list
            dense
            nav
            class="py-0"
          >
          <p class="Online">Online: {{ users.length }}</p>
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>

              <v-list-item-content
                e v-on:click="chattingUser()"
                  v-for="i in items"
                  :key="i.Users"
              >
              {{ i.Users }}
              <p class="surname">{{ username }}</p>
                <v-list-item-title>
                  </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10" sm="8">
      <v-card-text>
            <template>
              <keep-alive>
                <component :is="Users">
                  <!-- <OnlineUser v-bind:messages="messages" v-on:sendMessage="this.sendMessage"/> -->
                </component>
              </keep-alive>
            </template>
      </v-card-text>
       </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import OnlineUser from '../components/OnlineUser.vue'
import io from 'socket.io-client'
import Vue from 'vue'
Vue.component('Online User', OnlineUser)
export default {
  name: 'Chat',
  data () {
    return {
      items: [{ 'Users': 'Username' }],
      Users: 'Username',
      username: '',
      socket: io('http://localhost:5000'),
      messages: [],
      users: []
    }
  },
  methods: {
    chattingUser () {
      this.$root.$emit('OnlineUser')
    },
    JoinServer: function () {
      this.socket.on('LoggedIn', data => {
        this.messages = data.messages
        this.users = data.users
        this.socket.emit('newuser', this.username)
      })
      this.listen()
    },
    listen: function () {
      this.socket.on('userOnline', user => {
        this.users.push(user)
      })
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1)
      })

      this.socket.on('msg', message => {
        this.messages.push(message)
      })
    }
  },
  mounted: function () {
    this.$root.$on('OnlineUser', () => {
      this.Users = 'Online User'
    })
    this.username = prompt('What is your user name?', 'Anonymous')

    if (!this.username) {
      this.username = 'Anonymous'
    }

    this.JoinServer()
  }
}
</script>
<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9%;
  color: black;
  margin: 0;
  padding: 0;
}
</style>
