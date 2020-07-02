import General from './GeneralService'
import Constant from './constants'

class UserProfileService {
  static updateProfile (firstname, lastname, biography, relation, height, age, race, hair, street, postcode, city, country, state, userid, languages, interests) {
    return General.PostExecution(Constant.UpdateUserProfile, { firstname, lastname, biography, relation, height, age, race, hair, street, postcode, city, country, state, userid, languages, interests })
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
}

export default UserProfileService
