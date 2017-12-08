const Controller = require('./Controller')('reviews')
const Model = require('../model/review.model')
const fields = ['title', 'text', 'rating', 'snack_id', 'user_id']

class ReviewsController extends Controller {
  static userOwnsReview(req, res, next) {
    Model.userOwnsReview(req.headers.authorization, req.params.id).then(result => {
      if (result) {
        next()
      } else {
        next({ status: '403', message: 'Not authorized' })
      }
    })
  }

  static userCanReviewSnack(req, res, next) {
    const bearer = req.headers.authorization
    const snackId = req.body.snack_id
    Model.hasAlreadyPostedReview(bearer, snackId).then(result => {
      if (result) return next({ message: 'User has already reviewed snack' })
      else {
        return next()
      }
    })
  }

  static getAllSnackReviews(req, res, next) {
    Model.getAllSnackReviews(req.params.id).then(response => {
      res.status(200).json({ 'reviews': response })
    })
  }

  static getAverageSnackReview(req, res, next) {
    Model.getAverageSnackReview(req.params.id).then(response => {
      res.status(200).send(response)
    })
  }

  static getAllUserReviews(req, res, next) {
    Model.getAllUserReviews(req.params.id).then(response => {
      res.status(200).json({ 'reviews': response })
    })
  }

  static prune(req, res, next) {
    Object.keys(req.body).forEach(key => {
      if (!fields.includes(key)) delete req.body[key]
    })
    next()
  }

  static complete(req, res, next) {
    const errors = fields.filter(key => {
      return !req.body.hasOwnProperty(key)
    })
    if (errors.length) next({ message: 'There were errors', errors })
    else next()
  }

  static addUserId(req, res, next) {
    const bearer = req.headers.authorization
    Model.getUserIdFromBearer(bearer).then(result => {
      req.body.user_id = result
      next()
    }).catch(console.error)

  }
}

module.exports = ReviewsController
