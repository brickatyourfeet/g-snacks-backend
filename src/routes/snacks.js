const express = require('express');
const { snacksController: ctrl } = require('../controller')

const router = express.Router();

router.get('/', ctrl.index)
router.get('/:id', ctrl.exists, ctrl.show)
router.post('/', ctrl.create)
router.put('/:id', ctrl.exists, ctrl.update)
router.delete('/:id', ctrl.exists, ctrl.delete)

module.exports = router;
