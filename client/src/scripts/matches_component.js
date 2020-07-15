import axios from 'axios'
import config from '../services/config'
import Matches from '../services/MatchesService'
import EventBus from '../services/event_bus'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'matches',

  data () {
    return {
      posts: [],
      postsSuggestions: [],
      interes: ' common interest(s)',
      otherInteres: [],
      userInteres: [],
      number: 0
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
      try {
        await Matches.getMatches()
      } catch (error) {
        console.log(error)
      }
    },
    openProfile (userId, name, surname) {
      this.$session.set('matchId', { 'userId': userId, 'name': name, 'surname': surname })
      this.$root.$emit('OtherProfile')
    },
    async like (liking) {
      let userId = this.$session.get('userid')
      try {
        await axios.post(`http://localhost:5000/api/posts/like`, { liking, userId })
      } catch (error) {
        console.log(error)
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
          if (dist <= parseInt(userDist) && (parseInt(matchAge) <= parseInt(userAge)) && matchGender === userPrefGender) {
            user.interests = 0
            this.posts.push(user)
          } else if (matchGender === userPrefGender) {
            user.interests = 10 + ' common interest(s)'
            this.postsSuggestions.push(user)
          }
        }
      })
    },
    userIntere (otherUserId) {
      this.userInteres.forEach(interest => {
        this.otherIntere(interest)
      })
      if (this.number !== 0) {
        let res = this.posts.filter(user => user.user_id === otherUserId)
        let index = this.posts.indexOf(res[0])
        this.posts[index].interests = this.number
      }
    },
    otherIntere (interest) {
      this.number = 0
      this.otherInteres.forEach(other => {
        if (interest.interest_name === other.interest_name) {
          this.number++
        }
      })
    },
    async matchInterests (otherUserId) {
      let res = await Matches.matchInterests(this.$session.get('userid'), otherUserId)
      if (Object.keys(res).length !== 0) {
        this.otherInteres = res.otherUser
        this.userInteres = res.user
        this.userIntere(otherUserId)
        this.otherInteres = null
        this.userInteres = null
      }
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
      if (unit === 'K') { dist = dist * 1.609344 }
      return dist
    }
  },
  async mounted () {
    this.loadPosts()
    this.posts = []
    let res = await Matches.matching(this.$session.get('userid'))
    this.checkMatching(res.userData, res.matchData)
    this.posts.forEach(user => {
      this.matchInterests(user.user_id)
    })
  }
}
