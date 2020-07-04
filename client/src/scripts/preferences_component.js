import PreferenceService from '../services/PreferenceService'
import locations from '../services/MapLocationService'

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
      let result = await PreferenceService.sendData(this.item, this.rating, this.gender, this.language, this.location, this.interests, 1)
      alert(result.data)
    }
  },
  async mounted () {
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
  }
}
