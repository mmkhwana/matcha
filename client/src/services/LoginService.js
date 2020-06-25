import axios from 'axios'

const url = 'http://localhost:5000/api/posts/'
class LoginService {
  static userLogin (email, pass) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url + 'login', { email, pass })
        const data = res.data
        resolve(
          data[0]
        )
      } catch (error) {
        alert(error.message)
      }
    }
    )
  }
}
export default LoginService
