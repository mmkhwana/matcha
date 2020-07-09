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
      let response2 = await axios.get(`${config.apiUrl2}`)
      this.posts = response.data
      let result = response2.data
      result.forEach(element => {
        this.posts.push(element)
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
    async like (liking) {
      let userId = this.$session.get('userid')
      try {
        await axios.post(`http://localhost:5000/api/posts/like`, { liking, userId })
      } catch (error) {
        console.log(error)
      }
    },

    async Matchesliker () {
      let userId = this.$session.get('userid')
      let userliker = this.$session.get('user_liked_id')
      let userliked = this.$session.get('user_liker_id')
      if (userliker === userliked) {
        try {
          await axios.post(`http://localhost:5000/api/posts/like`, { userId })
        } catch (error) {
          console.log(error)
          alert('please like back')
        }
      }
    }
  },
  mounted () {
    this.loadPosts()
  }
}
