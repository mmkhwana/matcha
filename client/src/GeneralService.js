import axios from 'axios'

const url = 'http://localhost:5000/api/posts/'
class GeneralService {
  static UploadPhoto (image) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url + 'upload', { params: { image: image } }, {
          onUploadProgress: ProgressEvent => {
            console.log(ProgressEvent.loaded / ProgressEvent.total)
          }
        })
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
export default GeneralService
