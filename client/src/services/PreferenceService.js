import axios from 'axios'
const url = 'http://localhost:5000/api/posts/'

class PreferenceService {
  static sendData (age, rating, gender, language, location, Interests, userId) {
    return axios.post(url + '/set_preferences', { age, rating, gender, language, location, Interests, userId })
  }

  static removePrefInterest () {
    return axios.post(url + '/remove_pref_interest')
  }
}
export default PreferenceService
