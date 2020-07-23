import Matches from '../services/MatchesService'
import History from '../services/HistoryService'
import Convert from '../services/ConvertService'
import EventBus from '../services/event_bus'
import Interests from '../jsons/interests'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'matches',

  data () {
    return {
      posts: [],
      postsSuggestions: [],
      defaultInterests: [],
      interests: [],
      dist: ['50 ', '200', '500', '1000'],
      age_gap: ['25 & under', '35 & under', '45 & under', 'Above 45'],
      rating: 0,
      lastseen: 'last seen: ',
      age: '',
      distance: '',
      interes: ' common interest(s)',
      otherInteres: [],
      userInteres: [],
      number: 0,
      progress: false,
      userData: [],
      profile_pic: `http://localhost:5000/api/posts/uploads/generic_pp/generic_pp.png`,
      profile: '',
      dislike: 0,
      dislikes: []
    }
  },

  methods: {
    async search () {
      if (this.rating !== 0 || this.age || this.distance || this.interests.length !== 0) {
        this.progress = true
        let age = Convert.Age(this.age)
        try {
          if (this.rating !== 0 && this.age && this.distance) {
            let res = await Matches.searchWithAll(this.$session.get('userid'), age, this.rating)
            if (Object.keys(res).length !== 0) {
              this.processDistance(res)
            }
          } else if (this.rating !== 0 && this.age) {
            let res = await Matches.searchWithTwo(this.$session.get('userid'), age, this.rating, 'age&rating')
            if (Object.keys(res).length !== 0) {
              this.posts = res
            }
          } else if (this.age && this.distance) {
            let res = await Matches.searchWithTwo(this.$session.get('userid'), age, this.distance, 'age&dist')
            if (Object.keys(res.matchData).length !== 0) {
              this.processDistance(res)
            }
          } else if (this.rating !== 0 && this.distance) {
            let res = await Matches.searchWithTwo(this.$session.get('userid'), this.rating, this.distance, 'rating&dist')
            if (Object.keys(res.matchData).length !== 0) {
              this.processDistance(res)
            }
          } else if (this.age) {
            let res = await Matches.searchWithOne(this.$session.get('userid'), age, 'age')
            if (Object.keys(res).length !== 0) {
              this.posts = res
            }
          } else if (this.rating !== 0) {
            let res = await Matches.searchWithOne(this.$session.get('userid'), this.rating, 'rating')
            if (Object.keys(res).length !== 0) {
              this.posts = res
            }
          } else if (this.distance) {
            let res = await Matches.searchWithDistance(this.$session.get('userid'), this.distance)
            if (Object.keys(res).length !== 0) {
              this.processDistance(res)
            }
          } else if (this.interests.length) {
            let res = await Matches.matching(this.$session.get('userid'))
            if (Object.keys(res).length !== 0) {
              this.processInterests(res)
            }
          }
          this.progress = false
          this.rating = 0
          this.age = ''
          this.distance = ''
        } catch (error) {
          console.log(error)
        }
      }
    },
    processDistance (res) {
      let userdata = res.userData[0]
      let matchData = res.matchData
      this.posts = []
      let dist = ''
      matchData.forEach(user => {
        if (user.user_latitude) {
          dist = this.calcDistance(user.user_latitude, user.user_longitude, userdata.user_latitude, userdata.user_longitude, 'K')
          if (dist <= this.distance) {
            this.posts.push(user)
          }
        }
      })
    },
    async processInterests (res) {
      await this.checkingInterests(res.userData, res.matchData)
      this.posts.forEach(user => {
        this.matchInterests(user.user_id)
      })
    },
    async checkingInterests (userData, matchData) {
      this.posts = []
      matchData.forEach(user => {
        let matchGender = user.user_gender
        if (userData.prefGender) {
          if (matchGender === userData.prefGender) {
            user.interests = 0
            this.posts.push(user)
          }
        } else {
          user.interests = 0
          this.posts.push(user)
        }
      })
    },
    clear () {
      this.rating = 0
      this.age = ''
      this.distance = ''
      this.interests.splice(0)
      this.init()
    },
    openProfile (userId, name, surname, username) {
      this.$session.set('matchId', { 'userId': userId, 'name': name, 'surname': surname, 'username': username, 'parent': 'Matches' })
      this.$root.$emit('OtherProfile')
      this.putIntoHistory(userId, this.$session.get('userid'))
      EventBus.$emit('updateHistory')
    },
    async putIntoHistory (checkedUser, checkerUser) {
      try {
        await History.putIntoHistory(checkedUser, checkerUser)
      } catch (error) {
        console.log(error)
      }
    },
    async like (liking) {
      let rating = this.$refs['rating' + liking][0]._data.internalValue
      console.log(this.$session.get('profile'))
      if (rating !== 0 && this.$session.get('profile') === 'set') {
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
    async unlike (identifier, user, liking) {
      let userId = this.$session.get('userid')
      let index = -1
      if (identifier === 'matches') {
        index = this.posts.indexOf(user)
        this.posts.splice(index, 1)
      } else {
        index = this.posts.indexOf(user)
        this.postsSuggestions.splice(index, 1)
      }
      try {
        await Matches.unlike(liking, userId)
        EventBus.$emit('sendText', 'Dislike.')
      } catch (error) {
        console.log(error)
      }
    },
    async blocking (identifier, user, liking) {
      let userId = this.$session.get('userid')
      let index = -1
      if (identifier === 'matches') {
        index = this.posts.indexOf(user)
        this.posts.splice(index, 1)
      } else {
        index = this.posts.indexOf(user)
        this.postsSuggestions.splice(index, 1)
      }
      try {
        await Matches.blocking(liking, userId)
        EventBus.$emit('sendText', 'User blocked.')
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
          if (matchGender === 'Female' && userPrefGender !== 'Bi-sexual') {
            matchGender = 'Women'
          } else if (matchGender === 'Male' && userPrefGender !== 'Bi-sexual') {
            matchGender = 'Men'
          }
          if (userPrefGender === 'Bi-sexual') {
            matchGender = 'Bi-sexual'
          }
          user.interests = 0
          user.profile = 'none'
          user.dislike = 0
          user.user_last_seen = user.user_last_seen.substring(user.user_last_seen.indexOf('T') + 1, user.user_last_seen.lastIndexOf(':'))
          if (dist <= parseInt(userDist) && (parseInt(matchAge) <= parseInt(userAge)) && matchGender === userPrefGender) {
            this.posts.push(user)
          } else if (matchGender === userPrefGender) {
            this.posts.push(user)
          } else {
            this.postsSuggestions.push(user)
          }
        }
      })
    },
    async processDis () {
      this.posts.forEach(user => {
        console.log(user)
        let param = this.dislikes.filter(item => (item.user_liked_id === user.user_id && item.user_liker_id === this.$session.get('userid') && item.like_check === 0))
        if (param) {
          let index = this.posts.indexOf(user)
          this.posts.splice(index, 1)
        }
      })
    },
    async checkDislike () {
      try {
        let res = await Matches.checkLike(999, 999)
        if (res) {
          this.dislikes = res
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getBlocked () {
      try {
        let res = await Matches.getBlocked(this.$session.get('userid'))
        if (res.length !== 0) {
          this.posts.forEach(user => {
            let index = this.res.filter(item => item.blocker_id === user.user_id)
            if (index) {
              this.posts.splice(index, 1)
            }
          })
          this.postsSuggestions.forEach(user => {
            let index = this.res.filter(item => item.blocker_id === user.user_id)
            if (index) {
              this.postsSuggestions.splice(index, 1)
            }
          })
        }
      } catch (error) {

      }
    },
    async userIntere (otherUserId) {
      this.number = 0
      this.userInteres.forEach(interest => {
        this.otherIntere(interest)
      })
      if (this.number !== 0) {
        let res = this.posts.filter(user => user.user_id === otherUserId)
        let index = this.posts.indexOf(res[0])
        if (index !== -1) {
          this.posts[index].interests = this.number
        }
        if (Object.keys(this.interests).length !== 0) {
          this.posts = this.posts.filter(user => user.interests >= 1)
        }
      }
    },
    otherIntere (interest) {
      this.otherInteres.forEach(other => {
        if (Object.keys(this.interests).length !== 0) {
          if (interest === other.interest_name) {
            this.number++
          }
        } else {
          if (interest.interest_name === other.interest_name) {
            this.number++
          }
        }
      })
    },
    async matchInterests (otherUserId) {
      let res = await Matches.matchInterests(this.$session.get('userid'), otherUserId)
      if (Object.keys(res).length !== 0) {
        this.otherInteres = res.otherUser
        if (Object.keys(this.interests).length !== 0) {
          this.userInteres = this.interests
        } else {
          this.userInteres = res.user
        }
        await this.userIntere(otherUserId)
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
    },
    removeInterest (index, item) {
      this.interests.splice(index, 1)
    },
    addInterest (item) {
      const res = this.interests.filter(interest => interest === item)
      if (item && !res.includes(item)) {
        this.interests.push(item)
        this.interest = ''
      }
    },
    async getProfilePics () {
      let images = await Matches.getProfilePics(999)
      if (Object.keys(images).length !== 0) {
        images.forEach(image => {
          let user = this.posts.filter(user => user.user_id === image.user_id)
          if (user[0]) {
            let index = this.posts.indexOf(user[0])
            this.posts[index].profile = image.image_link
          }
        })
      }
    },
    compareInterests (res) {
      this.checkMatching(res.userData, res.matchData)
      this.posts.forEach(user => {
        this.matchInterests(user.user_id)
      })
    },
    async init () {
      this.posts = []
      this.defaultInterests = Interests
      let res = await Matches.matching(this.$session.get('userid'))
      this.userData = res.userData
      this.getProfilePics()
      setTimeout(this.callback(res), 2000)
      if (this.posts.length !== 0) {
        this.processDis()
        this.checkDislike()
      }
    },
    callback (res) {
      this.compareInterests(res)
    }
  },
  mounted: function () {
    this.init()
  }
}
