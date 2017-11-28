const express = require('express');
const knex = require('../db/knex');
const { snacksController: ctrl } = require('../controller')

const router = express.Router();

router.get('/', (req, res, next) => {
  knex('snacks')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => next(err))
})

router.get('/:id', (req, res, next) => {
  knex('snacks')
    .where('id', req.params.id).then(result => {
      res.send(result)
    })

})

module.exports = router;
