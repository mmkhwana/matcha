import LoginService from '../services/LoginService'
import Table from '../services/tables'
import router from '../router'
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
  beforeCreate () {
    if (this.$session.exists()) {
      router.push({ name: 'Dashboard' })
    }
  },
  methods: {
    async login () {
      try {
        const users = (await LoginService.userLogin(this.username, this.pass))[0]
        if (users[Table.User.userName]) {
          this.$session.start()
          this.$session.set('firstname', users[Table.User.firstName])
          this.$session.set('lastname', users[Table.User.lastName])
          this.$session.set('username', users[Table.User.userName])
          this.$session.set('userid', users[Table.User.userId])
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
