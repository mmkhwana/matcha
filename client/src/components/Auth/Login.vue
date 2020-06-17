<template>
<v-parallax
  src="../../assets/home.jpg"
  height= "900"
>
<v-row
  align="center"
  justify="center"
>
  <v-flex xs2 sm8 md4 >
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Meet Your Match!</h4>
     <v-btn v-on:click="register" rounded color="deep-purple lighten-3" dark lg >Want to register?</v-btn>
  </v-flex>
  <div
  v-for="(user, index) in users"
  v-bind:index="index"
  v-bind:item="user"
  v-bind:key="user._id"
  >
  <p>{{ user.email }} Khanyisa Mbukutshe</p>
  </div>
  <v-flex xs2 sm8 md4 >
      <v-form>
          <v-card>
              <v-card-text>
                  <v-text-field
                      icon="person"
                      name="username"
                      label="Username"
                      type="text"
                      v-model="username"
                  >
                  </v-text-field>
                  <v-text-field
                      icon="lock"
                      name="user_pwd"
                      label="Password"
                      type="password"
                      v-model="pass"
                  >
                  </v-text-field>
              </v-card-text>
              <v-card-actions>
                  <v-btn rounded color="deep-purple lighten-3 " dark v-on:click="login">Log In
                  </v-btn>
              </v-card-actions>
              <v-card-actions>
                  <a href ="#">Forget Password?</a>
              </v-card-actions>
          </v-card>
      </v-form>
  </v-flex>
</v-row>
</v-parallax>

</template>
<script>
import LoginService from '../../LoginService'
import router from '../../router'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)
var options = {
  persist: true
}
Vue.use(VueSession, options)
export default {
  name: 'Login',
  default () {
    return {
      users: [],
      username: '',
      pass: ''
    }
  },
  async created () {
    if (this.$session.exists()) {
      router.push({ name: 'Dashboard' })
    }
  },
  methods: {
    async login () {
      try {
        this.users = await LoginService.userLogin(this.username, this.pass)
        if (this.users.email === this.username && this.users.pass === this.pass) {
          this.$session.start()
          this.$session.set('email', this.users.email)
          this.$session.set('id', this.users._id)
          //  Vue.http.headers.common['Authorization'] = 'Bearer ' + this.users.email
          router.push({ name: 'Dashboard' })
        } else {
          alert('Incorrect Credentials. Please try Again.')
        }
      } catch (error) {
        alert(error.message)
      }
    },
    register () {
      router.push({ name: 'home' })
    }
  }
}
</script>
