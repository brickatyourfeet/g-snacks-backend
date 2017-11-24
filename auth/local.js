const moment = require('moment')
const jwt = require('jwt-simple')

function encodeToken(user) {
  const payload = {
    exp: moment().add(2, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  }
  return jwt.encode(payload, process.env.TOKEN_SECRET)
}

module.exports = { encodeToken }


//naming conventions
// exp: expiration date of the token
// iat: the time the token is generated
// sub: the subject of the token (the user whom it identifies)
