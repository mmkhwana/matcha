import General from './GeneralService'
import Constant from './constants'

class GalleryService {
  static readImages (username, userid) {
    return General.getReturnArrayExecution(Constant.Uploads, { username, userid })
  }

  static removeImage (picname, username, userId) {
    return General.PostExecution(Constant.RemoveImage, { picname, username, userId })
  }

  static setProfilePic (oldId, newId, userId) {
    return General.PostExecution(Constant.SetProfilePic, { oldId, newId, userId })
  }

  static setProfile (imageId) {
    return General.PostExecution(Constant.SetProfile, { imageId })
  }
}

export default GalleryService
