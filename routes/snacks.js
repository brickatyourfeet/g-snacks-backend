const express = require('express')
const knex = require('../db/knex')

const router = express.Router();

router.get('/snacks', (req, res, next) => {
  knex('snacks')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => next(err))
})

router.get('/snacks/:id', (req, res, next) => {
  knex('snacks')
    .where('id', req.params.id).then(result => {
      res.send(result)
    })

})

// router.delete()  delete if user id matches or isAdmin

module.exports = router