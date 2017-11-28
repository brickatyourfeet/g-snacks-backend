const express = require('express');
const { snacksController: ctrl } = require('../controller')

const router = express.Router();

router.get('/', ctrl.getAllSnacks)

// router.get('/:id', ctrl.getOneSnack)

module.exports = router;
