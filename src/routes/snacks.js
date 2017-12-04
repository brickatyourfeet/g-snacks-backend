const express = require('express');
const ctrl = require('../controller/snacks.controller')
const auth = require('../controller/users.controller') 

const router = express.Router();

router.get('/', ctrl.index)
router.get('/:id', ctrl.exists, ctrl.show)
router.post('/', auth.isAdmin, ctrl.complete, ctrl.prune, ctrl.create)
router.put('/:id', auth.isAdmin, ctrl.exists, ctrl.complete, ctrl.prune, ctrl.update)
router.delete('/:id', auth.isAdmin, ctrl.exists, ctrl.delete)

module.exports = router;
