<template>
<div class="parent-container">
    <v-parallax
    src="../assets/first.jpg"
    height="1100"
    class="parallax"
    breakpoint="(min-width: 80px)"
    >
    <v-row
    class="signup"
    justify="center"
    >
    <v-flex xs12 sm8 md4 >
        <h1 class="text-color display-3 mb-4">Welcome to Matcha</h1>
        <h4 class="text-color subheading font-weight-thin display-2">Meet Your Match!</h4>
        <v-btn v-on:click="Loginbtn" rounded color="pink accent-4" dark lg >Log in</v-btn>
        <v-btn v-on:click="Loginbtn" rounded color="pink accent-4" dark lg >Register</v-btn>
    </v-flex>
    <v-flex xs8 sm8 md4 >
        <v-card>
            <div v-if="error" class="alert">
                <p>{{ error }}</p>
            </div>
            <v-card-text>
                <v-form>
                    <v-container>
                    <v-row>
                        <v-text-field
                            name="email"
                            label="Please enter your new password"
                            type="password"
                            required
                            v-model="newpassword"
                            prepend-icon="mdi-image-filter-vintage"
                            class="dotted-line"
                        >
                        </v-text-field>s
                    </v-row>
                    <v-row>
                        <v-text-field
                            name="email"
                            label="Please confirm  your password"
                            type="password"
                            required
                            v-model="confirmpassword"
                            prepend-icon="mdi-image-filter-vintage"
                            class="dotted-line"
                        >
                        </v-text-field>
                    </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-container>
                <v-card-actions justify="center">
                    <v-btn  type="submit" class="btn-align" rounded  dark v-on:click="changepassword" v-if="!progress">Change Password
                    </v-btn>
                    <v-progress-circular class="btn-align" indeterminate color="green" v-else>
                    </v-progress-circular>
                </v-card-actions>
                <v-card-actions>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-flex>
    </v-row>
    </v-parallax>
  <v-card height="auto" class="footer">
  <v-footer
    dark
    :padless="true"
    absolute
  >
    <v-card
      width="100%"
      flat
      tile
      class="lighten-3 white--text text-center"
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
This site is built to allow two potential lovers to meet. No bullshit.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Matcha</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-card>
</div>
</template>
<style scoped src="../assets/css/signup.css" lang="css">
</style>
<script>
import user from '../services/SignupService'
import router from '../router'
export default {
  data () {
    return {
      error: '',
      newpassword: '',
      confirmpassword: ''
    }
  },
  methods: {
    changepassword () {
      this.error = ''
      this.checkerrors()
      if (this.newpassword !== this.confirmpassword) {
        this.error = 'Passwords Are Not Of Equal Length'
      }

      if (!this.error) {
        let email = this.$route.params.email
        user.changepassword(this.newpassword, email)
        router.push({ name: 'Login' })
      }
    },
    checkerrors () {
      let res = this.validPassword(this.newpassword)
      let res1 = this.validPassword(this.confirmpassword)
      if (res === false || res1 === false) {
        this.error = 'Min. 8 characters with at least one capital letter, a number and a special character.'
      }
    },
    validPassword: function (pass) {
      var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
      return pattern.test(pass)
    }
  }

}

</script>
