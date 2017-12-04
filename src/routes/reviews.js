const express = require('express');
const router = express.Router();
const ctrl = require('../controller/reviews.controller')
const Auth = require('../controller/users.controller')

router.get('/', Auth.isAuthenticated, ctrl.index)
router.get('/:id', ctrl.exists, ctrl.show)
router.post('/', ctrl.complete, ctrl.prune, ctrl.create)
router.put('/:id', ctrl.exists, ctrl.update)
router.delete('/:id', ctrl.exists, ctrl.delete)

module.exports = router
