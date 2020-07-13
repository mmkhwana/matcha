import axios from 'axios'
import config from '../services/config'
import VueSession from 'vue-session'
import OnlineUser from '../components/OnlineUser.vue'
import io from 'socket.io-client'
import Vue from 'vue'
Vue.use(VueSession)
Vue.component('Online User', OnlineUser)
export default {
  name: 'chat',
  components: {
    OnlineUser
  },
  data () {
    return {
      items: [{ 'Users': 'Username' }],
      //   Users: 'Username',
      //   username: '',
      socket: io('http://localhost:5000'),
      messages: [],
      users: [],
      posts: []
    }
  },
  methods: {
    updateMessage (message) {
      this.messages.push(message)
      this.socket.emit('msg', message)
    },
    getMessages () {
      return 'value'
    },
    JoinServer: function () {
      this.socket.on('LoggedIn', data => {
        this.messages = data.messages
        this.users = data.users
        this.socket.emit('newuser', this.items.Users)
      })
      this.listen()
    },
    listen: function () {
      this.socket.on('userOnline', user => {
        this.users.push(user)
      })
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1)
      })

      this.socket.on('msg', message => {
        this.messages.push(message)
      })
    },
    async loadMatches () {
      let response = await axios.get(`${config.apiUrl}`)
      let response3 = await axios.get(`${config.apiUrl3}`)
      this.posts = response.data
      let result = response3.data
      result.forEach(element => {
        this.posts.push(element)
      })
    },
    async Matchesliker (userLikerId, userLikedId) {
      let userId = this.$session.get('userid')
      let userliker = this.$session.get('user_liked_id')
      let userliked = this.$session.get('user_liker_id')
      if (userliker === userliked) {
        try {
          await axios.post(`http://localhost:5000/api/posts/matching_likes`, { userLikerId, userLikedId, userId })
        } catch (error) {
          console.log(error)
          alert('You have a match')
        }
      }
    }
  },
  mounted: function () {
    this.$root.$on('OnlineUser', () => {
      this.Users = 'Online User'
    })
    // this.username = prompt('What is your user name?', 'Anonymous')

    // if (!this.username) {
    //   this.username = 'Anonymous'
    // }
    this.JoinServer()
    this.loadMatches()
  }
}
