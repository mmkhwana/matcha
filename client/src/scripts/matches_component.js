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
        await Matches.getMatches()
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
  async mounted () {
    this.loadPosts()
    let res = await Matches.matching(this.$session.get('userid'))
    this.posts = res
  }
}
