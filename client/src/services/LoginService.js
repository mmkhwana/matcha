import Constant from './constants'
import GeneralService from './GeneralService'

class LoginService {
  static userLogin (email, pass) {
    return GeneralService.PostExecution(Constant.LoginUser, { email, pass })
  }
}
export default LoginService
