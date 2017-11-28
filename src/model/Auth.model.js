const Token = require('./Token.model')

class Auth {
  
  static isAuthenticated (token) {
    console.log(token)
    return Token.parseTokenAsync(token).catch(error => {
      throw new Error(`You are not authorized to access that route`)
    })
  }

  static isUser (id, token) {

  }

  static isAdmin (token) {

  }
}

module.exports = Auth