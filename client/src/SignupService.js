import axios from 'axios'

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
          })
          )
        )
      } catch (error) {
        reject(error)
      }
    }
    )
  }

  static registerUser (text) {
    return axios.post(url, { text })
  }

  static deleteUser (id) {
    return axios.delete(`${url}${id}`)
  }
}
export default SignupService
