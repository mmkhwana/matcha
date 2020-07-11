import axios from 'axios'
import Constants from './constants'
import General from './GeneralService'

class PreferenceService {
  static sendData (age, rating, gender, location, userId) {
    return axios.post(Constants.URL + '/' + Constants.SetPreferences, { age, rating, gender, location, userId })
  }

  static getPreferences (userId) {
    return General.PostExecution(Constants.GetPreferences, { userId })
  }

  static updatePreferences (prefId, age, rating, gender, location, userId) {
    return General.PostExecution(Constants.UpdatePreferences, { prefId, age, rating, gender, location, userId })
  }

  static getPrefeInterest (userId) {
    return General.PostExecution(Constants.GetPrefInterests, { userId })
  }

  static removePrefInterest (prefInterest, userId) {
    return General.PostExecution(Constants.RemovePrefInterest, { prefInterest, userId })
  }
}
export default PreferenceService
