const express = require('express');
const knex = require('../db/knex');
const { snacksController: ctrl } = require('../controller')

const router = express.Router();

router.get('/', ctrl.getAllSnacks)

module.exports = router;
