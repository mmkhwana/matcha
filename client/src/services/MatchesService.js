import GeneralService from './GeneralService'
import Constants from './constants'

class MatchesService {
  static getMatches () {
    return GeneralService.GetExecutionNoParam(Constants.GetMatches)
  }

  static like (liking, rating, userId) {
    return GeneralService.PostExecution(Constants.Like, { liking, rating, userId })
  }

  static matching (userId) {
    return GeneralService.PostExecution('matching', { userId })
  }
  static matchInterests (userId, otherUser) {
    return GeneralService.PostExecution('read_interests', { userId, otherUser })
  }
}

export default MatchesService
