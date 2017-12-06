const router = require('express').Router({ mergeParams: true })
const reviewController = require('../controller/reviews.controller')
const auth = require('../controller/users.controller')

router.get('/', reviewController.getAllUserReviews)

module.exports = router
