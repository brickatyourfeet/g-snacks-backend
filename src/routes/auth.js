const express = require('express')
const router = express.Router()

const localAuth = require('../auth/local')
const authHelpers = require('../auth/_helpers')
const AuthController  = require('../controller/auth.controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)

//use the get user route for deciding what user sees and can post on front end?
router.get('/user',
  authHelpers.ensureAuthenticated,
  (req, res, next) => {
    res.status(200).json({
      status: 'success'
    })
  })

module.exports = router
