const Model = require('./Model')('reviews')
const Token = require('../model/Token.model')
const knex = require('../db/knex')

class Review extends Model {
  static getAllSnackReviews(snackId) {
    return knex('reviews').where({ snack_id: snackId })
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

  static getUserIdFromBearer (bearer) {
    return Token.parseTokenAsync(bearer).then(payload => {
      return payload.sub.id
    }).catch(console.log)
  }
}

module.exports = Review
