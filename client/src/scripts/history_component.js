import VueSession from 'vue-session'
import Matches from '../services/MatchesService'
import History from '../services/HistoryService'
import EventBus from '../services/event_bus'
import Vue from 'vue'
Vue.use(VueSession)
export default {
  name: 'history',
  data () {
    return {
      posts: []
    }
  },
  mounted: function () {
    this.retrieveHistory()
    EventBus.$on('updateHistory', () => {
      this.posts = ''
      this.posts = []
      this.retrieveHistory()
    })
  },
  methods: {
    openProfile (userId, name, surname) {
      this.$session.set('matchId', { 'userId': userId, 'name': name, 'surname': surname, 'parent': 'History' })
      this.$root.$emit('OtherProfile')
    },
    async like (liking) {
      let rating = this.$refs['rating' + liking][0]._data.internalValue
      if (rating !== 0) {
        let userId = this.$session.get('userid')
        try {
          await Matches.like(liking, rating, userId)
        } catch (error) {
          console.log(error)
        }
      } else {
        EventBus.$emit('sendText', 'Rate first.')
      }
    },
    async retrieveInfo (userId) {
      try {
        let results = await History.retrieveHistoryInfo(userId)
        if (Object.keys(results).length !== 0) {
          this.posts.push(results[0])
        }
      } catch (error) {
        console.log(error)
      }
    },
    async retrieveHistory () {
      try {
        let res = await History.retrieveHistoryId(this.$session.get('userid'))
        if (Object.keys(res).length !== 0) {
          res.forEach(user => {
            this.retrieveInfo(user.user_checked_id)
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
