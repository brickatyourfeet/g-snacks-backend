const { sign, verify } = require('jsonwebtoken')
const { promisify } = require('util')
const verifyAsync = promisify(verify)
const secret = process.env.SECRET_KEY

class Token {
  static signToken({ id, role }) {
    const sub = { id, role }
    const expiresIn = '14d'
    return sign({ sub }, secret, { expiresIn })
  }

  static parseTokenAsync(bearer) {
    const token = bearer ? bearer.replace('Bearer ', '') : null
    return verifyAsync(token, secret)
  }
}

module.exports = Token
