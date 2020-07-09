import Matches from '../services/MatchesService'
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
      try {
        let response = await Matches.getMatches()
        this.posts = response
      } catch (error) {

      }
    },
    async like (liking) {
      let userId = this.$session.get('userid')
      try {
        await Matches.like(liking, userId)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.loadPosts()
  }
}
