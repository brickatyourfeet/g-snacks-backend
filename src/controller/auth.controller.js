const Auth = require('../model/Auth.model')
const Token = require('../model/Token.model')

// const localAuth = require('../auth/local')
const authHelpers = require('../auth/_helpers')

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

module.exports = AuthController