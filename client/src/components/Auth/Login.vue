<template>
<<<<<<< HEAD
    <v-container fill-height>
        <v-layout align-center justify-center>
=======
<v-parallax
  src="../../assets/home.jpg"
  height= "1000"
>
<v-row
  align="center"
  justify="center"
>
  <v-col class="text-center" cols="12">
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Meet Your Match!</h4>
  </v-col>
    <v-col class="text-center" cols="12">
        <div
        v-for="(user, index) in users"
        v-bind:index="index"
        v-bind:item="user"
        v-bind:key="user._id"
        >
        <p>{{ user.email }} Khanyisa Mbukutshe</p>
        </div>
  </v-col>
  <v-col class="text-center" cols="12">
     <v-layout align-center justify-center>
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
            <v-flex xs12 sm8 md4 >
                <v-form>
                    <v-card>
                        <v-toolbar
<<<<<<< HEAD
                            color="primary"
=======
                            color="deep-purple lighten-3"
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
                            dark
                        >
                            <v-toolbar-title>
                                Login Form
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field
                                icon="person"
                                name="username"
                                label="Username"
                                type="text"
<<<<<<< HEAD
=======
                                v-model="username"
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
                            >
                            </v-text-field>
                            <v-text-field
                                icon="lock"
                                name="user_pwd"
                                label="Password"
                                type="password"
<<<<<<< HEAD
=======
                                v-model="pass"
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
                            >
                            </v-text-field>
                        </v-card-text>
                        <v-divider light></v-divider>
                        <v-card-actions>
<<<<<<< HEAD
                            <v-btn rounded color ="indigo" dark>Sign Up</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn rounded color ="primary" dark>Login
=======
                            <v-btn rounded color="deep-purple lighten-3" dark v-on:click="login">Login
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
                            </v-btn>
                        </v-card-actions>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <a href ="#">Forget Password?</a>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
<<<<<<< HEAD
    </v-container>
</template>
<script>
export default {
  name: 'Login'
=======
  </v-col>
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
          alert(this.$session.get('id'))
          //  Vue.http.headers.common['Authorization'] = 'Bearer ' + this.users.email
          router.push({ name: 'Dashboard' })
        } else {
          alert('Incorrect Credentials. Please try Again.')
        }
      } catch (error) {
        alert(error.message)
      }
    }
  }
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
}
</script>
