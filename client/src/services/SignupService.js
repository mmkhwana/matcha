import axios from 'axios'
import Constant from './constants'
import GeneralService from './GeneralService'

const url = 'http://localhost:5000/api/posts/'
class SignupService {
  static getUsers () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  static registerUser (gender, race, firstname, lastname, username, email, date, pass, confirm) {
    return GeneralService.PostExecution(Constant.RegisterUser, { gender, race, firstname, lastname, username, email, date, pass, confirm })
  }

  static deleteUser (id) {
    return axios.delete(`${url}${id}`)
  }
}
export default SignupService
