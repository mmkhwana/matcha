import axios from 'axios'
import Constant from './constants'

class GeneralService {
  static UploadPhoto (image) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(Constant.URL + 'upload', image)
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

  static PostExecution (router, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(Constant.URL + router, params)
        resolve(res.data)
        reject(res.data)
      } catch (error) {
        console.log(error)
      }
    })
  }

  static GetExecution (router, param) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(Constant.URL + router + param)
        resolve(res.data)
        reject(res.data)
      } catch (error) {
        console.log(error)
      }
    })
  }
}
export default GeneralService