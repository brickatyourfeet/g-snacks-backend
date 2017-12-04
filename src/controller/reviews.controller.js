const Controller = require('./Controller')('reviews')
const Model = require('../model/review.model')
const fields = ['title', 'text', 'rating', 'snack_id', 'user_id']

class ReviewsController extends Controller {
  static userOwnsReview (req, res, next) {
    // check bearer token
    // get review 
    // see if review.user_id matches bearer.sub.id
  }

  static userCanReviewSnack (req, res, next) {
    // check bearer token
    // get snack reviews
    // see if user has already reviewed that snack
  }

  static getAllSnackReviews (req, res, next) {
    Model.getAllSnackReviews(req.params.id).then(response => {
      res.status(200).json({ 'reviews': response })
    })
  }

  static prune(req, res, next) {
    Object.keys(req.body).forEach(key => {
      if(!fields.includes(key)) delete req.body[key]
    })
    next()
  }

  static complete(req, res, next) {
    const errors = fields.filter(key => {
      return !req.body.hasOwnProperty(key)
    })
    if(errors.length) next({ message: 'There were errors', errors })
    else next()
  }
}

module.exports = ReviewsController

// const review = {
//   title: req.body.title,
//   text: req.body.text,
//   rating: req.body.rating,
//   snack_id: req.body.snack_id,
//   user_id: req.body.user_id
// }