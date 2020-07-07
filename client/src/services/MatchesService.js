import GeneralService from './GeneralService'
import Constants from './constants'

class MatchesService {
  static getMatches () {
    return GeneralService.GetExecutionNoParam(Constants.GetMatches)
  }

  static like (liking, userId) {
    return GeneralService.PostExecution(Constants.Like, { liking, userId })
  }
}

export default MatchesService
