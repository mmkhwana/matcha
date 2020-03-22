import axios from 'axios'

const url = 'http://localhost:5000/api/posts/'

class UserProfileService {
  static updateProfile (biography, relation, height, age, hair, languages, interests) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url + '/update_profile', { params: { biography, relation, height, age, hair, languages, interests } })
        const data = res.data
        resolve(
          data
        )
        reject(
          data
        )
      } catch (error) {
        console.log(error)
      }
    })
  }

  static readImages () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + '/uploads')
        resolve(res)
        reject(res)
      } catch (error) {
        console.log(error)
      }
    })
  }
}

export default UserProfileService
