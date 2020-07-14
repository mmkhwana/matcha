import Matches from '../services/MatchesService'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'matches',

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
    openProfile (userId, name, surname) {
      this.$session.set('matchId', { 'userId': userId, 'name': name, 'surname': surname })
      this.$root.$emit('OtherProfile')
    },
    async like (liking) {
      let userId = this.$session.get('userid')
      try {
        await Matches.like(liking, userId)
      } catch (error) {
        console.log(error)
      }
    },
    checkMatching (userData, matchData) {
      let userLati = userData.lat
      let userLongi = userData.longi
      let userAge = userData.age
      let userDist = userData.userDist
      let userPrefGender = userData.prefGender
      matchData.forEach(user => {
        let matchLati = user.user_latitude
        let matchLongi = user.user_longitude
        let matchAge = user.user_age
        let matchGender = user.user_gender
        let dist = this.calcDistance(matchLati, matchLongi, userLati, userLongi, 'K')
        if (matchLati !== null) {
          console.log(dist)
          console.log(userDist)
          if (dist <= parseInt(userDist) && (parseInt(matchAge) <= parseInt(userAge)) && matchGender === userPrefGender) {
            this.posts.push(user)
          }
        }
      })
    },
    calcDistance (lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1 / 180
      var radlat2 = Math.PI * lat2 / 180
      var theta = lon1 - lon2
      var radtheta = Math.PI * theta / 180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      dist = Math.acos(dist)
      dist = dist * 180 / Math.PI
      dist = dist * 60 * 1.1515
      if (unit === 'K') { dist = dist * 1.609344 } else { return 'Error message' }
      return dist
    }
  },
  async mounted () {
    this.loadPosts()
    this.posts = []
    let res = await Matches.matching(this.$session.get('userid'))
    this.checkMatching(res.userData, res.matchData)
  }

}
