import General from './GeneralService'
import Constant from './constants'
class HistoryService {
  static retrieveHistoryId (userId) {
    return General.PostExecution(Constant.RetrieveHistoryId, { userId })
  }
  static retrieveHistoryInfo (userId) {
    return General.PostExecution(Constant.RetrieveHistoryInfo, { userId })
  }
  static putIntoHistory (checkedId, checkerId) {
    return General.PostExecution(Constant.PutIntoHistory, { checkedId, checkerId })
  }
}
export default HistoryService
