import UserProfileService from '../services/UserProfileService'
import Table from '../services/tables'
import Constant from '../services/constants'
import Interests from '../jsons/interests'
import Languages from '../jsons/languages'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'Profile Edit',
  data () {
    return {
      pictures: [],
      selection: [],
      languages: [],
      interests: [],
      defaultInterests: [],
      defaultLanguages: [],
      toInterest: [],
      toLanguages: [],
      firstname: '',
      lastname: '',
      address: '39 Rissik Street',
      postcode: '2001',
      city: 'Johannesburg',
      country: 'South Africa',
      state: 'Gauteng',
      biography: '',
      items: [
        { name: Constant.relationship, value: '' },
        { name: Constant.height, value: '' },
        { name: Constant.age, value: '' },
        { name: Constant.race, value: '' },
        { name: Constant.hair, value: '' }
      ],
      profileObj: [],
      success: '',
      dialog: false,
      loading: false,
      modal: false,
      dialogBox: false,
      username: ''
    }
  },
  props: {
    lang: { type: String },
    interest: { type: String }
  },
  async mounted () {
    this.$root.$on('Edit', () => {
      this.titles = 'Edit'
    })
    this.defaultInterests = Interests
    this.defaultLanguages = Languages
    this.username = this.$session.get('username')
    const res = (await UserProfileService.getUserDetails(this.$session.get('userid')))[0]
    let output = await UserProfileService.getInterest(this.$session.get('userid'))
    let lang = await UserProfileService.getLanguage(this.$session.get('userid'))
    this.firstname = res[Table.User.firstName]
    this.lastname = res[Table.User.lastName]
    this.biography = res[Table.User.biography]
    this.items[0].value = res[Table.User.status]
    this.items[1].value = res[Table.User.height] + 'm'
    this.items[2].value = res[Table.User.age] + 'yrs'
    this.items[3].value = res[Table.User.race]
    this.items[4].value = res[Table.User.hair]
    lang.forEach(lang => {
      this.languages.push(lang[Table.Languages.name])
    })
    output.forEach(interest => {
      this.interests.push(interest[Table.Interests.name])
    })
    const pics = await UserProfileService.readImages(this.username)
    this.pictures = pics.data
  },
  methods: {
    async updateProfile () {
      this.dialog = true
      try {
        let results = await UserProfileService.updateProfile(this.firstname, this.lastname,
          this.biography, this.items[0].value, this.items[1].value, this.items[2].value, this.items[3].value,
          this.items[4].value, 1, this.languages, this.interests)
        await UserProfileService.insertInterest(this.interests, 1)
        await UserProfileService.insertLanguage(this.languages, 1)
        this.success = results
        this.dialog = false
      } catch (error) {
        console.log(error)
      }
    },
    close (index) {
      this.languages.splice(index, 1)
    },
    removeInterest (index) {
      this.interests.splice(index, 1)
    },
    addLanguage () {
      let res = this.languages.filter(lang => lang === this.lang)
      if (this.lang && (res !== this.lang)) {
        this.languages.push(this.lang)
        this.lang = ''
      }
    },
    addInterest () {
      let res = this.interests.filter(interest => interest === this.interest)
      if (this.interest && (res !== this.interest)) {
        this.interests.push(this.interest)
        this.interest = ''
      }
    },
    getSelectedItem () {
      this.dialogBox = false
      alert(JSON.stringify(this.toInterest))
    },
    addOject (key, value) {
      this.$set(this.profileObj, key, value)
    },
    upload () {
      if (this.pictures.length < 5) {
        this.$root.$emit('Upload')
        this.$destroy()
      } else {
        alert('The maximum of five pictures has been reached!')
      }
    }
  }
}