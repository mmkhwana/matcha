import General from './GeneralService'
import Constant from './constants'
class HistoryService {
  static retrieveHistoryId (userId) {
    return General.PostExecution(Constant.RetrieveHistoryId, { userId })
  }
  static retrieveHistoryInfo (userId) {
    return General.PostExecution(Constant.RetrieveHistoryInfo, { userId })
  }

  static retrieveUsers (userId) {
    return General.PostExecution('retrieve_users', { userId })
  }

  static peopleLikedYou (userId) {
    return General.PostExecution('people_who_liked_you', { userId })
  }

  static peopleViewedYou (userId) {
    return General.PostExecution('people_who_viewed_you', { userId })
  }

  static putIntoHistory (checkedId, checkerId) {
    return General.PostExecution(Constant.PutIntoHistory, { checkedId, checkerId })
  }
}
export default HistoryService
