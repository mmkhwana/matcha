import PreferenceService from '../services/PreferenceService'
import locations from '../services/MapLocationService'
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
    var d = this.distance_for_two_people(-26.172134388860822, 27.880723951255362, -26.204661, 28.040053, 'K')
    console.log(d)
  },
  methods: {
    async getPreferences () {
      try {
        const res = (await PreferenceService.getPreferences(this.getUserSession()))[0]
        this.age = CheckAge.check(res[Table.Preference.age])
        this.gender = res[Table.Preference.gender]
        this.rating = parseInt(res[Table.Preference.rating])
        this.language = res[Table.Preference.lang]
        this.location = res[Table.Preference.location]
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
    async getLocation () {
      try {
        const google = await locations()
        const location = new google.maps.places.Autocomplete(this.$refs['input'])
        const info = new google.maps.InfoWindow()
        const infoContent = document.getElementById('location-window')
        info.setContent(infoContent)
        location.addListener('place_changed', () => {
          info.close()
          let place = location.getPlace()
          let address = ''
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name),
              (place.address_components[1] && place.address_components[0].short_name),
              (place.address_components[2] && place.address_components[2].short_name)
            ].join(' ')
          }
          infoContent.children['place-icon'].src = place.icon
          infoContent.children['place-name'].textContent = place.name
          infoContent.children['place-address'].textContent = address
        })
      } catch (error) {
        console.log(error)
      }
    },
    async sendData () {
      let result = await PreferenceService.sendData(this.age, this.rating, this.gender, this.language, 'Tabankulu', this.interests, this.$session.get('userid'))
      EventBus.$emit('sendText', result.data)
    },
    async updatePref () {
      await PreferenceService.updatePreferences(this.prefId, this.age, this.rating, this.gender, this.language, 'Tabankulu', this.interests, this.$session.get('userid'))
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
    distance_for_two_people (lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1 / 180
      var radlat2 = Math.PI * lat2 / 180
      var theta = lon1 - lon2
      var radtheta = Math.PI * theta / 180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      dist = Math.acos(dist)
      dist = dist * 180 / Math.PI
      dist = dist * 60 * 1.1515
      if (unit === 'K') { dist = dist * 1.609344 } else { return 'Error messege' }
      return dist
    },
    result: fetch(navigator.geolocation.getCurrentPosition(
      function (position) {
        var long = position.coords.longitude
        var lat = position.coords.latitude
        console.log(long, lat)
      }))
  }
}
