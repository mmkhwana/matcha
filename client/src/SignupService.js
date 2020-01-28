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

<<<<<<< HEAD
  static registerUser (text, username, email, pass, confirm) {
    return axios.post(url, { text, confirm, email, username, pass })
=======
  static registerUser (username, email, date, pass, confirm) {
    return axios.post(url, { username, email, date, pass, confirm })
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
  }

  static deleteUser (id) {
    return axios.delete(`${url}${id}`)
  }
}
export default SignupService
