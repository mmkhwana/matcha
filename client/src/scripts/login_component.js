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
  name: 'login',
  data () {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
      ],
      users: [],
      username: '',
      pass: '',
      error: '',
      progress: false,
      latitude: 0,
      longitude: 0
    }
  },
  beforeCreate () {
    if (this.$session.exists()) {
      router.push({ name: 'Dashboard' })
    }
  },
  mounted: function () {
    navigator.geolocation.getCurrentPosition(this.getSuccess)
  },
  methods: {
    getSuccess  (position) {
      this.getCoordinates(position.coords.latitude, position.coords.longitude)
    },
    getCoordinates (lati, longi) {
      this.latitude = lati
      this.longitude = longi
    },
    async login () {
      this.error = ''
      this.checkForm()
      if (!this.error.length) {
        this.progress = true
        try {
          const users = (await LoginService.userLogin(this.username, this.pass))[0]
          if (users === 'notverified') {
            this.error = 'Account was not verified.'
          } else if (users === 'notfound') {
            this.error = 'user doesn\'t exists.'
          } else if (users[Table.User.userName]) {
            this.$session.start()
            this.$session.set('firstname', users[Table.User.firstName])
            this.$session.set('lastname', users[Table.User.lastName])
            this.$session.set('username', users[Table.User.userName])
            this.$session.set('userid', users[Table.User.userId])
            this.$session.set('latitude', this.latitude)
            this.$session.set('longitude', this.longitude)
            router.push({ name: 'Dashboard' })
          }
          this.progress = false
        } catch (error) {
          this.error = 'Incorrect username or password.'
          this.progress = false
        }
      }
      this.progress = false
    },
    register () {
      router.push({ name: 'home' })
    },
    checkForm: function () {
      if (!this.username && !this.pass) {
        this.error = 'username and password required.'
      } else if (!this.username) {
        this.error = 'username required.'
      } else if (!this.pass) {
        this.error = 'password required.'
      }
    }
  }
}
