import axios from 'axios'

const url = 'http://localhost:5000/api/posts/'

class PreferenceService {
  static sendData (age, rating, gender, language, location, interests, userId) {
    return axios.post(url + '/set_preferences', { age, rating, gender, language, location, interests, userId })
  }
}
export default PreferenceService
