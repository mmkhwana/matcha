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
    return GeneralService.PostExecution(Constants.Matching, { userId })
  }
  static matchInterests (userId, otherUser) {
    return GeneralService.PostExecution(Constants.ReadInterests, { userId, otherUser })
  }

  static searchWithOne (userId, value, type) {
    return GeneralService.PostExecution(Constants.SearchWithOne, { userId, value, type })
  }

  static searchWithRating (rating) {
    return GeneralService.PostExecution(Constants.SearchWithRating, { rating })
  }

  static searchWithDistance (userId, distance) {
    return GeneralService.PostExecution(Constants.SearchWithDistance, { userId, distance })
  }

  static searchWithAll (age, rating, distance) {
    return GeneralService.PostExecution(Constants.SearchWithAll, { age, rating, distance })
  }

  static searchWithAgeRating (age, rating) {
    return GeneralService.PostExecution(Constants.SearchWithAgeRating, { age, rating })
  }

  static searchWithAgeDistance (age, distance) {
    return GeneralService.PostExecution(Constants.SearchWithAgeDistance, { age, distance })
  }

  static searchWithRatingDistance (rating, distance) {
    return GeneralService.PostExecution(Constants.SearchWithRatingDistance, { rating, distance })
  }
}

export default MatchesService
