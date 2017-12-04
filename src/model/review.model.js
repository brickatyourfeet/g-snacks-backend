const Model = require('./Model')('reviews')
const knex = require('../db/knex')

class Review extends Model {
  static getAllSnackReviews(snackId) {
    return knex('reviews').where({ snack_id: snackId })
  }

  static hasAlreadyPostedReview(user, snack) {
    const match = {
      user_id: user.id,
      snack_id: snack.id
    }
    return knex('reviews').where(match).select('*').first()
      .then(match => {
        if(match[0]) return true
        else return false
      })
  }
}

module.exports = Review
