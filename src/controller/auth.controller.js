const Auth = require('../model/Auth.model')
const Token = require('../model/Token.model')

class AuthController {
  static isAuthenticated (req, res, next) {
    const bearer = req.headers.authorization
    Auth.isAuthenticated(bearer)
      .then(() => next())
      .catch(next)
  }

  static isUser (req, res, next) {

  }

  static isAdmin (req, res, next) {

  } 
}

module.exports = AuthController