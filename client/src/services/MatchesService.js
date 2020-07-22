import GeneralService from './GeneralService'
import Constants from './constants'

class MatchesService {
  static getMatches () {
    return GeneralService.GetExecutionNoParam(Constants.GetMatches)
  }

  static like (liking, rating, userId) {
    return GeneralService.PostExecution(Constants.Like, { liking, rating, userId })
  }
  static unlike (liking, userId) {
    return GeneralService.PostExecution(Constants.Unlike, { liking, userId })
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

  static searchWithTwo (userId, number, value, type) {
    return GeneralService.PostExecution(Constants.SearchWithTwo, { userId, number, value, type })
  }

  static searchWithAll (userId, age, rating) {
    return GeneralService.PostExecution(Constants.SearchWithAll, { userId, age, rating })
  }

  static searchWithDistance (userId, distance) {
    return GeneralService.PostExecution(Constants.SearchWithDistance, { userId, distance })
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

  static getProfilePics (id) {
    return GeneralService.PostExecution(Constants.GetProfilePics, { id })
  }
}

export default MatchesService
