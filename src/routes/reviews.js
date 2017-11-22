const express = require('express');
const knex = require('../db/knex');

const router = express.Router();

router.get('/reviews', (req, res, next) => {
  knex('reviews')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => next(err))
})

module.exports = router;
