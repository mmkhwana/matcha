import PreferenceService from '../services/PreferenceService'
import Table from '../services/tables'
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
      location: null,
      locations: [],
      dropdown_icon: [{ text: '25 & under' }, { text: '35 & under' }, { text: '45 & under' }, { text: 'Above 45' }],
      gender_type: [{ text: 'Women' }, { text: 'Men' }, { text: 'Lesbians' }, { text: 'Gays' }],
      results: [],
      city: '',
      prefId: -404
    }
  },
  async mounted () {
    this.getPreferences()
    this.getPrefInterests()
  },
  methods: {
    async getPreferences () {
      try {
        const res = (await PreferenceService.getPreferences(this.getUserSession()))[0]
        this.age = this.reversecheckingAge(res[Table.Preference.age])
        this.gender = res[Table.Preference.gender]
        this.rating = parseInt(res[Table.Preference.rating])
        this.distance = res[Table.Preference.location]
        if (this.age !== null) { this.prefId = parseInt(res[Table.Preference.id]) }
      } catch (error) {
        console.log(error)
      }
    },
    getUserSession () {
      return this.$session.get('userid')
    },
    async sendData () {
      let checkedAge = this.checkingAge(this.age)
      let result = await PreferenceService.sendData(checkedAge, this.rating, this.gender, this.distance, this.$session.get('userid'))
      EventBus.$emit('sendText', result.data)
    },
    async updatePref () {
      let checkedAge = this.checkingAge(this.age)
      await PreferenceService.updatePreferences(this.prefId, checkedAge, this.rating, this.gender, this.distance, this.$session.get('userid'))
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
    },
    checkingAge (age) {
      if (age === '25 & under') {
        return 25
      } else if (age === '35 & under') {
        return 35
      } else if (age === '45 & under') {
        return 45
      } else {
        return 46
      }
    },
    reversecheckingAge (age) {
      if (parseInt(age) === 25) {
        return '25 & under'
      } else if (parseInt(age) === 35) {
        return '35 & under'
      } else if (parseInt(age) === 45) {
        return '45 & under'
      } else {
        return 'Above 45'
      }
    }
  }
}
