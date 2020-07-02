import General from './GeneralService'
import Constant from './constants'

class GalleryService {
  static readImages (username) {
    return General.getReturnArrayExecution(Constant.Uploads, username)
  }

  static removeImage (picname, username, userId) {
    return General.PostExecution(Constant.RemoveImage, { picname, username, userId })
  }

  static setProfilePic (picname, username, userId) {
    return General.PostExecution(Constant.SetProfilePic, { picname, username, userId })
  }
}

export default GalleryService
