import axios from 'axios'

const url = 'http://localhost:5000/api/posts/'
class GeneralService {
  static UploadPhoto (image) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url + 'upload', image)
        const data = res.data
        resolve(
          data
        )
        reject(
          data
        )
      } catch (error) {
        alert(error.message)
      }
    }
    )
  }
}
export default GeneralService
