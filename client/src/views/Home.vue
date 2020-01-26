<template>
<v-parallax
  src="../assets/home.jpg"
  height= "1000"
>
<v-row
  align="center"
  justify="center"
>
  <v-col class="text-center" cols="12">
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Want to find your perfect date today!</h4>
    <v-btn v-on:click="Loginbtn" rounded color="deep-purple lighten-3" dark lg >Login</v-btn>
  </v-col>
  <v-col class="text-center" cols="12">
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
                    <v-card-text >{{ response }}</v-card-text>
                </v-toolbar>
                    <v-card-text>
                        <v-form>
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
                                v-model="username"
                            >
                            </v-text-field>
                            <v-text-field
                                name="user_email"
                                label="Email"
                                type="text"
                                v-model="email"
                            >
                            </v-text-field>
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
                                <v-btn rounded color="deep-purple lighten-3" dark v-on:click="insertUser">Sign Up</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
        </v-flex>
    </v-layout>
  </v-col>
</v-row>
</v-parallax>

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
      var respond = await SignupService.registerUser(this.username, this.email, this.date, this.pass, this.confirm)
      this.response = respond.data
      if (this.response === 'User Registered') {
        router.push({ name: 'Login' })
      }
    //  this.posts = await SignupService.getUsers()
    },
    Loginbtn () {
      router.push({ name: 'Login' })
    }
  }
}
</script>
