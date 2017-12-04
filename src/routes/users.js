const express = require('express');
const router = express.Router();
const ctrl = require('../controller/users.controller')

router.get('/', ctrl.isAdmin, ctrl.index)
router.get('/:id', ctrl.isAdmin, ctrl.show)
// no router.post('/') route, because auth.register creates the user
router.patch('/:id', ctrl.isAdminOrIsUser, ctrl.exists, ctrl.update)
router.delete('/:id', ctrl.isAdmin, ctrl.exists, ctrl.delete)

module.exports = router
