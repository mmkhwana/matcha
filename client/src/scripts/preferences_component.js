import PreferenceService from '../services/PreferenceService'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'Preference',
  data: function () {
    return {
      rating: '0.5',
      item: null,
      gender: null,
      language: null,
      location: null,
      locations: [],
      dropdown_icon: [{ text: '18-21' }, { text: '22-25' }, { text: '26-29' }, { text: '30-33' }, { text: '34-37' }],
      languages: [{ text: 'English' }, { text: 'Xhosa' }, { text: 'Zulu' }, { text: 'Sotho' }, { text: 'Sepedi' }],
      gender_type: [{ text: 'Women' }, { text: 'Men' }, { text: 'Lesbians' }, { text: 'Gays' }],
      results: [],
      city: ''
    }
  },
  methods: {
    async sendData () {
      let result = await PreferenceService.sendData(this.item, this.rating, this.gender, this.language, 'Katlehong', 'drinking', this.$session.get('userid'))
      alert(result.data)
    }
  },
  watch: {
    results: fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBlt9Sp7yGY_zrXiZx5NDQJS6lb17r4jco')
      .then(result => result.json()).then(result => {
        result.forEach(element => {
          this.results.push(element.address.country)
        })
      }, error => {
        alert(error.message)
      })
  }
}
