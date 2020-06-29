import UserProfileService from '../services/UserProfileService'
import Table from '../services/tables'
import Constant from '../services/constants'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'Edit',
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
      username: '',
      address: '39 Rissik Street',
      postcode: '2001',
      city: 'Johannesburg',
      country: 'South Africa',
      state: 'Gauteng'
    }
  },
  async mounted () {
    this.username = this.$session.get('username')
    const res = (await UserProfileService.getUserDetails(this.$session.get('userid')))[0]
    let output = await UserProfileService.getInterest(this.$session.get('userid'))
    let lang = await UserProfileService.getLanguage(this.$session.get('userid'))
    this.biography = res[Table.User.biography]
    this.personality[0].value = res[Table.User.status]
    this.personality[1].value = res[Table.User.height] + 'm'
    this.personality[2].value = res[Table.User.age] + 'yrs'
    this.personality[3].value = res[Table.User.race]
    this.personality[4].value = res[Table.User.hair]
    lang.forEach(lang => {
      this.languages.push(lang[Table.Languages.name])
    })
    output.forEach(interest => {
      this.interests.push(interest[Table.Interests.name])
    })
    const pics = await UserProfileService.readImages(this.username)
    this.pictures = pics.data
  },
  methods:
  {
    edit () {
      this.$root.$emit('Edit')
    }
  }
}
