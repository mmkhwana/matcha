import Matches from '../views/Matches'
import Preference from '../views/Preference'
import Profile from '../views/Profile'
import Edit from '../views/ProfileEdit'
import router from '../router'
import VueSession from 'vue-session'
import Settings from '../views/Settings'
import Chat from '../views/Chat'
import Upload from '../views/dialog'
import Vue from 'vue'
Vue.use(VueSession)
Vue.component('Preference', Preference)
Vue.component('Matches', Matches)
Vue.component('Profile', Profile)
Vue.component('Settings', Settings)
Vue.component('Chat', Chat)
Vue.component('Edit', Edit)
Vue.component('Upload Photo', Upload)
export default {
  name: 'Dashboard',
  data () {
    return {
      dropdown_icon: ['18-21', '22-25', '26-29', '30-33', '34-37'],
      items: [{ title: 'Profile', icon: 'mdi-account' },
        { title: 'Preference', icon: 'mdi-settings' },
        { title: 'Matches', icon: 'mdi-account-group' },
        { title: 'Chat', icon: 'mdi-chat' },
        { title: 'Settings', icon: 'mdi-settings' },
        { title: 'Log Out', icon: 'mdi-logout' }],
      titles: 'Profile',
      drawer: false,
      check: null,
      username: this.$session.get('username'),
      fullname: this.$session.get('firstname') + ' ' + this.$session.get('lastname')
    }
  },
  watch: {
    check () {
      this.drawer = false
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      router.push({ name: 'home' })
    }
  },
  computed: {
    changeComponents () {
      if (this.titles === 'Preference') {
        return 'Preference'
      } else if (this.titles === 'Matches') {
        return 'Matches'
      } else if (this.titles === 'Settings') {
        return 'Settings'
      } else if (this.titles === 'Chat') {
        return 'Chat'
      } else if (this.titles === 'Profile Edit') {
        return 'Edit'
      } else {
        return 'Profile'
      }
    }
  },
  mounted () {
    this.$root.$on('Edit', () => {
      this.titles = 'Edit'
    })
    this.$root.$on('Upload', () => {
      this.titles = 'Upload Photo'
    })
  },
  methods: {
    async changeTitles (titleName) {
      if (titleName === 'Log Out') {
        if (this.$session.exists()) {
          this.$session.clear()
          this.$session.destroy()
          router.push({ name: 'home' })
        }
      } else {
        this.titles = titleName
      }
    },
    logout () {
      if (this.$session.exists()) {
        this.$session.clear()
        this.$session.destroy()
        router.push({ name: 'home' })
      }
    },
    getRef () {
      return (this.$refs.title).innerHTML
    }
  }
}
