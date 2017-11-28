const express = require('express');
const router = express.Router();
const ctrl = require('../controller/reviews.controller')
// const Auth = require('../controllers/Auth')

router.get('/', ctrl.index)
router.get('/:id', ctrl.exists, ctrl.show)
router.post('/', ctrl.complete, ctrl.prune, ctrl.create)
router.put('/:id', ctrl.exists, ctrl.update)
router.delete('/:id', ctrl.exists, ctrl.delete)


// router.delete('/:id', (req, res, next) => {
//   let id = req.params.id
//   knex('reviews').where('id', id).then(review => {
//     if (review[0].user_id === req.body.user_id || req.body.isAdmin) {
//       knex('reviews').where('id', id).del().then(response => {
//         res.statusCode = 200;
//         res.send('Successfully removed review entry.')
//       }).catch(e => {
//         res.statusCode = 500;
//         res.send('failed to delete review.')
//       })
//     } else {
//       res.statusCode = 401;
//       res.send("You do not have permission to remove this review entry.")
//     }
//   })
// })

module.exports = router
