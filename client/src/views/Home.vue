<template>
<v-parallax
<<<<<<< HEAD
src="../assets/home2.jpg"
height="1000"

=======
  src="../assets/home.jpg"
  height= "1000"
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
>
<v-row
  align="center"
  justify="center"
>
<<<<<<< HEAD
  <v-col class="text-center" cols="6">
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Want to find your perfect date today!</h4>
  </v-col>
  <v-col class="text-center" cols="6">
=======
  <v-col class="text-center" cols="12">
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Want to find your perfect date today!</h4>
    <v-btn v-on:click="Loginbtn" rounded color="deep-purple lighten-3" dark lg >Login</v-btn>
  </v-col>
  <v-col class="text-center" cols="12">
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 >
            <v-card class="elevation-12">
                <v-toolbar
                    color="deep-purple lighten-3"
                    dark
                >
                    <v-toolbar-title>
                        SignUp Form
                    </v-toolbar-title>
<<<<<<< HEAD
                </v-toolbar>
                    <v-card-text>
                        <v-form>
=======
                    <v-card-text >{{ response }}</v-card-text>
                </v-toolbar>
                    <v-card-text>
                      <v-alert-box>
                        <p>{{ error }}</p>
                      </v-alert-box>
                        <v-form  >
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
                            <!-- <v-alert
                                :value="true"
                                color="error"
                                icon="warning"
                            >
                            This user already exist, try a different set of data.
                            </v-alert> -->
                            <v-text-field
                                icon="person"
                                name="username"
                                label="Username"
                                type="text"
<<<<<<< HEAD
                                v-model="text"
                            >
                            </v-text-field>
                            <v-text-field
                                icon="email"
=======
                                v-model="username"
                            >
                            </v-text-field>
                            <v-text-field
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
                                name="user_email"
                                label="Email"
                                type="text"
                                v-model="email"
                            >
                            </v-text-field>
<<<<<<< HEAD
=======
                            <v-dialog
                                    ref="dialog"
                                    v-model="modal"
                                    :return-value.sync="date"
                                    persistent
                                    width="290px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-text-field
                                        v-model="date"
                                        label="Date of Birth"
                                        readonly
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" type="month" scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-dialog>
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
                            <v-text-field
                                icon="lock"
                                name="user_pwd"
                                label="Password"
                                type="password"
                                v-model="pass"
                            >
                            </v-text-field>
                            <v-text-field
                                icon="lock"
                                name="user_confpwd"
                                label="Confirm Password"
                                type="password"
                                v-model="confirm"
                            >
                            </v-text-field>
                            <v-card-actions>
<<<<<<< HEAD
                                <v-btn rounded color ="indigo" dark v-on:click="insertUser">Sign Up</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn rounded color ="indigo" dark v-on:click="insertUser">Login</v-btn>
=======
                                <v-btn rounded color="deep-purple lighten-3" dark v-on:click="insertUser">Sign Up</v-btn>
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
        </v-flex>
    </v-layout>
  </v-col>
</v-row>
</v-parallax>
<<<<<<< HEAD
</template>
<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {
=======

</template>
<script>
// @ is an alias to /src
import SignupService from '../SignupService'
import router from '../router'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)
var options = {
  persist: true
}
Vue.use(VueSession, options)
export default {
  name: 'home',
  data () {
    return {
      posts: [],
      error: '',
      username: '',
      email: '',
      pass: '',
      confirm: '',
      date: '',
      response: ''
    }
  },
  async created () {
    try {
      if (this.$session.exists()) {
        router.push({ name: 'Dashboard' })
      }
      this.posts = await SignupService.getUsers()
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    async insertUser () {
      this.error = ''
      this.checkForm()
      if (!this.error.length) {
        var respond = await SignupService.registerUser(this.username, this.email, this.date, this.pass, this.confirm)
        this.response = respond.data
        if (this.response === 'User Registered') {
          router.push({ name: 'Login' })
        }
      }
    //  this.posts = await SignupService.getUsers()
    },
    Loginbtn () {
      router.push({ name: 'Login' })
    },
    checkForm: function () {
      if (!this.username) {
        this.error = 'Name required.'
      }
      if (!this.email) {
        this.error = 'Email required.'
      } else if (!this.validEmail(this.email)) {
        this.error = 'Valid email required.'
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
  }
}
</script>
