const express = require('express');
const { snacksController: ctrl } = require('../controller')

const router = express.Router();

router.get('/', ctrl.index)
router.get('/:id', ctrl.show)
router.post('/', ctrl.create)
router.put('/:id', ctrl.update)
router.delete('/:id', ctrl.delete)

// router.get('/:id', ctrl.getOneSnack)

module.exports = router;
