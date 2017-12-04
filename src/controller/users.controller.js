const Controller = require('./Controller')('users')
const Model = require('../model/user.model')
const Token = require('../model/Token.model')

const authHelpers = require('../auth/_helpers')

class UsersController extends Controller {
  static isAuthenticated (req, res, next) {
    const bearer = req.headers.authorization
    Model.isAuthenticated(bearer)
      .then(() => next())
      .catch(next)
  }

  static isUser (req, res, next) {
    // get token from header
    // find user from token
  }

  static isAdmin (req, res, next) {
    const bearer = req.headers.authorization
    Model.isAdmin(bearer)
      .then(() => next())
      .catch(next)
  } 

  static registerUser (req, res, next) {
    return authHelpers.createUser(req)
      .then(user => { return Token.signToken(user) })
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
  }

  static loginUser (req, res, next) {
    const email = req.body.email
    const password = req.body.password
    return authHelpers.getUser(email)
      .then((response) => {
        authHelpers.comparePass(password, response.password)
        return response
      })
      .then((response) => { return Token.signToken(response) })
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
  }
}

module.exports = UsersController
