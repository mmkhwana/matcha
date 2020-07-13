import Matches from '../views/Matches'
import Preference from '../views/Preference'
import Profile from '../views/Profile'
import Edit from '../views/ProfileEdit'
import router from '../router'
import VueSession from 'vue-session'
import Settings from '../views/Settings'
import Chat from '../views/Chat'
import Upload from '../views/dialog'
import OtherProfile from '../views/OtherProfile'
import EventBus from '../services/event_bus'
import Service from '../services/UserProfileService'
import Alert from '../components/alert'
import Vue from 'vue'
Vue.use(VueSession)
Vue.component('Preference', Preference)
Vue.component('Matches', Matches)
Vue.component('Profile', Profile)
Vue.component('Settings', Settings)
Vue.component('Chat', Chat)
Vue.component('Edit', Edit)
Vue.component('Upload', Upload)
Vue.component('OtherProfile', OtherProfile)
export default {
  name: 'Dashboard',
  components: {
    Alert
  },
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
      profile: '',
      username: this.$session.get('username'),
      fullname: this.$session.get('firstname') + ' ' + this.$session.get('lastname'),
      notifications: [
        { message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
        { message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco' },
        { message: 'Duis aute irure dolor in reprehenderit in voluptate' },
        { message: 'Excepteur sint occaecat cupidatat non proident' }
      ],
      count: '0',
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
      ]
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
      } else if (this.titles === 'Edit') {
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
      this.titles = 'Upload'
    })
    this.$root.$on('OtherProfile', (Fullname) => {
      this.titles = 'OtherProfile'
    })
    this.$root.$on('Matches', (Fullname) => {
      this.titles = 'Matches'
    })
    EventBus.$on('profile', (picname) => {
      this.profile = `http://localhost:5000/api/posts/uploads/${this.username}/${picname}`
    })
    this.count = this.notifications.length
    this.updateCoordinates()
  },
  methods: {
    async updateCoordinates () {
      try {
        if (this.$session.get('latitude') && this.$session.get('longitude')) {
          await Service.coordinates(this.$session.get('latitude'), this.$session.get('longitude'), this.$session.get('userid'))
        }
      } catch (error) {
        console.log(error)
      }
    },
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
