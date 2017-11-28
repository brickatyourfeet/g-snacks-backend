const { sign, verify } = require('jsonwebtoken')
const { promisify } = require('util')
const verifyAsync = promisify(verify)
const secret = process.env.SECRET_KEY

class Token {
  static signToken({ id, role }) {
    const sub = { id, role }
    const expiresIn = '2 weeks'
    return sign({ sub }, secret, { expiresIn })
  }

  static parseTokenAsync() {
    const token = bearer ? bearer.replace('Bearer ', '') : null
    return verifyAsync(token, process.env.SECRET_KEY)
  }
}
