const express = require('express');
const router = express.Router();
const ctrl = require('../controller/reviews.controller')
const Auth = require('../controller/users.controller')

router.get('/', Auth.isAuthenticated, ctrl.index)
router.get('/:id', Auth.isAuthenticated, ctrl.exists, ctrl.show)
router.post('/', Auth.isAuthenticated, ctrl.addUserId, ctrl.userCanReviewSnack, ctrl.complete, ctrl.prune, ctrl.create)
router.put('/:id', Auth.isAuthenticated, ctrl.exists, ctrl.update)
router.delete('/:id', Auth.isAuthenticated, ctrl.exists, ctrl.delete)

module.exports = router
