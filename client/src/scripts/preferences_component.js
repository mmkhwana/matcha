import PreferenceService from '../services/PreferenceService'
import Table from '../services/tables'
import CheckAge from '../services/check_age'
import Interests from '../jsons/interests'
import EventBus from '../services/event_bus'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'Preference',
  data: function () {
    return {
      dist: ['50 ', '200', '500', '1000'],
      distance: null,
      rating: 0.5,
      age: null,
      gender: null,
      language: null,
      location: null,
      locations: [],
      dropdown_icon: [{ text: '18-21' }, { text: '22-25' }, { text: '26-29' }, { text: '30-33' }, { text: '34-37' }],
      languages: [{ text: 'English' }, { text: 'Xhosa' }, { text: 'Zulu' }, { text: 'Sotho' }, { text: 'Sepedi' }],
      gender_type: [{ text: 'Women' }, { text: 'Men' }, { text: 'Lesbians' }, { text: 'Gays' }],
      results: [],
      city: '',
      interests: [],
      defaultInterests: [],
      prefId: -404
    }
  },
  async mounted () {
    this.defaultInterests = Interests
    this.getPreferences()
    this.getPrefInterests()
  },
  methods: {
    async getPreferences () {
      try {
        const res = (await PreferenceService.getPreferences(this.getUserSession()))[0]
        this.age = CheckAge.check(res[Table.Preference.age])
        this.gender = res[Table.Preference.gender]
        this.rating = parseInt(res[Table.Preference.rating])
        this.language = res[Table.Preference.lang]
        this.distance = res[Table.Preference.location]
        if (this.age !== null) { this.prefId = parseInt(res[Table.Preference.id]) }
      } catch (error) {
        console.log(error)
      }
    },
    async getPrefInterests () {
      try {
        const res = (await PreferenceService.getPrefeInterest(this.getUserSession()))
        res.forEach(interest => {
          this.interests.push(interest[Table.PrefInterest.interest])
        })
      } catch (error) {
        console.log(error)
      }
    },
    getUserSession () {
      return this.$session.get('userid')
    },
    async sendData () {
      let result = await PreferenceService.sendData(this.age, this.rating, this.gender, this.language, this.distance, this.interests, this.$session.get('userid'))
      EventBus.$emit('sendText', result.data)
    },
    async updatePref () {
      alert(this.distance)
      await PreferenceService.updatePreferences(this.prefId, this.age, this.rating, this.gender, this.language, this.distance, this.interests, this.$session.get('userid'))
      EventBus.$emit('sendText', 'Saved successfully.')
    },
    async remove (index, interest) {
      EventBus.$emit('sendText', `${this.interests[index]} is removed.`)
      this.interests.splice(index, 1)
      try {
        await PreferenceService.removePrefInterest(interest, this.getUserSession())
      } catch (error) {
        console.log(error)
      }
    },
    addInterest (item) {
      const res = this.interests.filter(inter => inter === item)
      if (!res.includes(item)) {
        this.interests.push(item)
      }
    }
  }
}
