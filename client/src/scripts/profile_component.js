import UserProfileService from '../services/UserProfileService'
import Table from '../services/tables'
import Constant from '../services/constants'

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
      ]
    }
  },
  async mounted () {
    const res = (await UserProfileService.getUserDetails(1))[0]
    let output = await UserProfileService.getInterest(1)
    let lang = await UserProfileService.getLanguage(1)
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
    const pics = await UserProfileService.readImages()
    this.pictures = pics.data
  },
  methods:
  {
    edit () {
      this.$root.$emit('Edit')
    }
  }
}
