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
      ],
      gender_type: [{ text: 'Female' }, { text: 'Male' }, { text: 'Lesbian' }, { text: 'Gay' }],
      gender: ''
    }
  },
  beforeCreate () {
    try {
      if (this.$session.exists()) {
        router.push({ name: 'Dashboard' })
      }
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
        var respond = await SignupService.registerUser(this.gender, this.firstname, this.lastname, this.username, this.email, year - birthYear, this.pass, this.confirm)
        this.response = respond
        if (this.response === 'User Registered') {
          router.push({ name: 'Login' })
        } else {
          this.error = this.response
        }
      }
    },
    Loginbtn () {
      router.push({ name: 'Login' })
    },
    checkForm: function () {
      if (!this.gender) {
        this.error = 'Gender required.'
      }
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