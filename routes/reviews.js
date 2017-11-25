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


router.get('/reviews/:id', (req, res, next) => {
  const id = req.params.id
  if (typeof id != 'undefined') {
    knex('reviews')
      .select()
      .where('id', id)
      .first()
      .then(review => {
        res.send(review)
      })
  }
})


router.post('/reviews', (req, res, next) => {

  if (req.body.rating) { //will need more validation than this
    const review = {
      title: req.body.title,
      text: req.body.text,
      rating: req.body.rating,
      snack_id: req.body.snack_id,
      user_id: req.body.user_id
    }

    knex('reviews')
      .insert(review, 'id')
      .then(ids => {
        const id = ids[0]
        //res.redirect(`/reviews/${id}`) //can redirect to the page with review?
        res.send(review)
      })

  } else {
    res.statusCode = 404
    res.send('no')
  }
})

router.patch('/reviews/:id', (req, res, next) => {

  let id = req.params.id
  let review = knex('reviews').where('id', id).then(review => {
    console.log(review[0].user_id);
    console.log(id);
    if (review[0].user_id === req.body.user_id) {

      let body = {
        title: req.body.title,
        text: req.body.text,
        rating: req.body.rating
      }

      knex('reviews').where('id', id).update(body).then(result => {
        res.statusCode = 200
        res.send('updated')
      })
    } else {
      res.statusCode = 500;
      res.send("You did not create this review.");
    }
  })
})


module.exports = router;
