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
      posts: [],
      peopleViewedYou: [],
      peopleLikedYou: [],
      profile_pic: `http://localhost:5000/api/posts/uploads/generic_pp/generic_pp.png`
    }
  },
  mounted: function () {
    this.retrieveHistory()
    this.retrievePeopleViewedYou()
    this.retrievePeopleLikedYou()
    EventBus.$on('updateHistory', () => {
      this.posts = ''
      this.posts = []
      this.retrieveHistory()
    })
  },
  methods: {
    openProfile (userId, name, surname, username) {
      console.log('executing...username: ' + username + 'ID: ' + userId)
      this.$session.set('matchId', { 'userId': userId, 'name': name, 'surname': surname, 'username': username, 'parent': 'History' })
      this.$root.$emit('OtherProfile')
      this.putIntoHistory(userId, this.$session.get('userid'))
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
    async putIntoHistory (checkedUser, checkerUser) {
      try {
        await History.putIntoHistory(checkedUser, checkerUser)
      } catch (error) {
        console.log(error)
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
    },
    async retrieveViewers (userId) {
      try {
        let results = await History.retrieveHistoryInfo(userId)
        if (Object.keys(results).length !== 0) {
          this.peopleViewedYou.push(results[0])
        }
      } catch (error) {
        console.log(error)
      }
    },
    async retrieveLikers (userId) {
      try {
        let results = await History.retrieveHistoryInfo(userId)
        if (Object.keys(results).length !== 0) {
          this.peopleLikedYou.push(results[0])
        }
      } catch (error) {
        console.log(error)
      }
    },
    async retrievePeopleLikedYou () {
      try {
        let res = await History.peopleLikedYou(this.$session.get('userid'))
        if (Object.keys(res).length !== 0) {
          res.forEach(user => {
            this.retrieveLikers(user.user_liker_id)
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async retrievePeopleViewedYou () {
      try {
        let res = await History.peopleViewedYou(this.$session.get('userid'))
        if (Object.keys(res).length !== 0) {
          res.forEach(user => {
            this.retrieveViewers(user.user_checker_id)
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
