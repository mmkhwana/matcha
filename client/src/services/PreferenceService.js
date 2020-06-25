import axios from 'axios'
const url = 'http://localhost:5000/api/posts/'

class PreferenceService {
  static sendData (age, rating, gender, language, location, interests, id) {
    return axios.post(url + 'preference', { age, rating, gender, language, location, interests, id })
  }
}
export default PreferenceService
