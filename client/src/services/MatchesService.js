import GeneralService from './GeneralService'
import Constants from './constants'

class MatchesService {
  static getMatches () {
    return GeneralService.GetExecutionNoParam(Constants.GetMatches)
  }

  static like (liking, userId) {
    return GeneralService.PostExecution(Constants.Like, { liking, userId })
  }

  static matching (userId) {
    return GeneralService.PostExecution('matching', { userId })
  }
}

export default MatchesService
