const Model = require('./Model')('reviews')
const Token = require('../model/Token.model')
const knex = require('../db/knex')

class Review extends Model {
  static getAllSnackReviews(snackId) {
    return knex('reviews').where({ snack_id: snackId })
  }

  static getAverageSnackReview(snackId) {
    return knex('reviews').avg('rating').where({ snack_id: snackId })
  }

  static getAllUserReviews(userId) {
    return knex('reviews').where({ user_id: userId })
  }

  static hasAlreadyPostedReview(bearer, snackId) {
    return Token.parseTokenAsync(bearer).then(payload => {
        const match = {
          user_id: payload.sub.id,
          snack_id: snackId
        }
        return match
      })
      .then(match => knex('reviews').where(match).select('*'))
      .then(found => {
        return (!!found.length)
      })
  }

  static getUserIdFromBearer(bearer) {
    return Token.parseTokenAsync(bearer).then(payload => {
      return payload.sub.id
    }).catch(console.log)
  }

  static userOwnsReview(bearer, snackId) {
    const tokenPromise = Token.parseTokenAsync(bearer)
    const snackPromise = this.show(snackId)

    return Promise.all([tokenPromise, snackPromise])
      .then(result => {
        const [tokenResult, snackResult] = result
        return tokenResult.sub.id === snackResult.user_id
      })
  }
}

module.exports = Review
