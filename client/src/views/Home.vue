<template>
<v-parallax
  dark
  src="../assets/home.jpg"
  height="900"
>
<v-row
  align="center"
  justify="center"
  absolute
>
  <v-flex xs12 sm8 md4 >
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Want to find your perfect date today?</h4>
    <v-btn v-on:click="Loginbtn" rounded color="deep-purple lighten-3" dark lg >Log in</v-btn>
  </v-flex>
  <v-flex xs8 sm8 md4 >
      <v-card>
          <v-card-text >{{ response }}</v-card-text>
              <v-card-text>
                <v-alert-box>
                  <p>{{ error }}</p>
                </v-alert-box>
                  <v-form  >
                      <!-- <v-alert
                          :value="true"
                          color="error"
                          icon="warning"
                      >
                      This user already exist, try a different set of data.
                      </v-alert> -->
                  <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="firstname"
                      label="First name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="lastname"
                      label="Last name"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                          <v-btn rounded color="deep-purple lighten-3" dark v-on:click="insertUser">Register</v-btn>
                      </v-card-actions>
                  </v-form>
              </v-card-text>
          </v-card>
  </v-flex>
</v-row>
<v-row padless>
  <v-footer
    dark
    padless
    absolute
  >
    <v-card
      flat
      tile
      class="deep-purple lighten-3 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
 Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Matcha</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-row>
</v-parallax>
</template>
<script>
// @ is an alias to /src
import SignupService from '../services/SignupService'
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
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      pass: '',
      confirm: '',
      date: '',
      response: '',
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
      ]
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
        let year = new Date().getFullYear()
        let birthYear = new Date(this.date).getFullYear()
        var respond = await SignupService.registerUser(this.firstname, this.lastname, this.username, this.email, year - birthYear, this.pass, this.confirm)
        this.response = respond
        alert(this.response)
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
      if (!this.pass) {
        this.error = 'Password required.'
      } else if (!this.validPassword(this.pass)) {
        this.error = 'Min. 8 characters with at least one capital letter, a number and a special character.'
      }
      if (!this.confirm) {
        this.error = 'Confirm Password required.'
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
    },
    validPassword: function (pass) {
      var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
      return pattern.test(pass)
    }
  }
}
</script>
