const express = require('express')
const router = express.Router()

const localAuth = require('../auth/local')
const authHelpers = require('../auth/_helpers')

router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req)
    .then(user => { return localAuth.encodeToken(user) })
    .then((token) => {
      res.status(200).json({
        status: 'success',
        token: token
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: err
      })
    })
})

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  return authHelpers.getUser(email)
    .then((response) => {
      authHelpers.comparePass(password, response.password)
      return response
    })
    .then((response) => { return localAuth.encodeToken(response) })
    .then((token) => {
      res.status(200).json({
        status: 'success',
        token: token
      })
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error'
      })
    })
})
//use the get user route for deciding what user sees and can post?
router.get('/user',
  authHelpers.ensureAuthenticated,
  (req, res, next) => {
    res.status(200).json({
      status: 'success'
    })
  })

module.exports = router
