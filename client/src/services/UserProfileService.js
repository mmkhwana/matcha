import General from './GeneralService'
import Constant from './constants'

class UserProfileService {
  static updateProfile (firstname, lastname, biography, relation, height, age, race, hair, street, postcode, city, country, state, userid, languages, interests, latitude, longitude) {
    return General.PostExecution(Constant.UpdateUserProfile, { firstname, lastname, biography, relation, height, age, race, hair, street, postcode, city, country, state, userid, languages, interests, latitude, longitude })
  }

  static insertLanguage (langName, userId) {
    return General.PostExecution(Constant.InsertLanguage, { langName, userId })
  }

  static insertInterest (interestName, userId) {
    return General.PostExecution(Constant.InsertInterest, { interestName, userId })
  }

  static getLanguage (userId) {
    return General.GetExecution(Constant.GetUserLanguage, userId)
  }

  static getInterest (userId) {
    return General.GetExecution(Constant.GetUserInterest, userId)
  }

  static removeLanguage (langId, userId) {
    return General.PostExecution(Constant.RemoveLanguage, { langId, userId })
  }

  static removeInterest (interestName, userId) {
    return General.PostExecution(Constant.RemoveInterest, { interestName, userId })
  }

  static getUserDetails (userid) {
    return General.GetExecution(Constant.GetUserDetails, userid)
  }

  static uploadImage (imageData) {
    return General.PostUploadImageExecution(Constant.Upload, imageData)
  }
  static coordinates (lati, longi, userid) {
    return General.PostExecution(Constant.Coordinates, { lati, longi, userid })
  }
  static online (userId, online) {
    return General.PostExecution('online', { online, userId })
  }
  static logOut (userId, lastseen, online) {
    return General.PostExecution('logout', { online, lastseen, userId })
  }
  static getDateTime () {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    var time = date.toTimeString()
    time = time.substring(0, time.indexOf(' '))
    return (year + '-' + month + '-' + day + ' ' + time)
  }
}

export default UserProfileService
