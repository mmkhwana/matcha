import UserProfileService from '../services/UserProfileService'
import GalleryService from '../services/GalleryService'
import Table from '../services/tables'
import Constant from '../services/constants'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'OtherProfile',
  data: () => {
    return {
      pictures: [],
      biography: '',
      languages: [],
      interests: [],
      personality: [
        { name: Constant.relationship, value: '' },
        { name: Constant.height, value: '' },
        { name: Constant.age, value: '' },
        { name: Constant.race, value: '' },
        { name: Constant.hair, value: '' }
      ],
      username: 'kmbukuts',
      street: '',
      postcode: '',
      city: '',
      country: '',
      state: '',
      userid: '',
      rating: 0
    }
  },
  mounted: function () {
    let data = this.$session.get('matchId')
    this.userid = data.userId
    this.getDetails()
    this.getImages()
  },
  methods:
  {
    closeProfile () {
      this.$root.$emit('Matches')
      this.$destroy()
    },
    async getDetails () {
      const res = (await UserProfileService.getUserDetails(this.userid))[0]
      let output = await UserProfileService.getInterest(this.userid)
      let lang = await UserProfileService.getLanguage(this.userid)
      this.street = res[Table.User.street]
      this.postcode = res[Table.User.postcode]
      this.city = res[Table.User.city]
      this.country = res[Table.User.country]
      this.state = res[Table.User.state]
      this.biography = res[Table.User.biography]
      this.personality[0].value = res[Table.User.status]
      this.rating = res[Table.User.AvgRating]
      if (res[Table.User.height]) {
        this.personality[1].value = res[Table.User.height] + 'm'
      } else {
        this.personality[1].value = ''
      }
      this.personality[2].value = res[Table.User.age] + 'yrs'
      this.personality[3].value = res[Table.User.race]
      this.personality[4].value = res[Table.User.hair]
      lang.forEach(lang => {
        this.languages.push(lang[Table.Languages.name])
      })
      output.forEach(interest => {
        this.interests.push(interest[Table.Interests.name])
      })
    },
    async getImages () {
      let images = []
      const pics = await GalleryService.readImages('kmbukuts', 70)
      images = pics.data
      images.forEach(row => {
        this.pictures.push({ id: row[Table.Images.id], name: row[Table.Images.name], role: row[Table.Images.role] })
      })
    }
  }
}
