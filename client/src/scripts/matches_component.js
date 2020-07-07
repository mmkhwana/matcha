import axios from 'axios'
import config from '../services/config'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'users',

  data () {
    return {
      posts: []
    }
  },

  methods: {
    async loadPosts () {
      let response = await axios.get(`${config.apiUrl}`)
      this.posts = response.data
    },
    async like (liking) {
      let userId = this.$session.get('userid')
      try {
        await axios.post(`http://localhost:5000/api/posts/like`, { liking, userId })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.loadPosts()
  }
}
