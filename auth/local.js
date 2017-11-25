const moment = require('moment')
const jwt = require('jwt-simple')

const TOKEN_SECRET = '2c5ba43d-551c-42f1-ae55-aebdfac97b6a';

function encodeToken(user) {
  const payload = {
    exp: moment().add(2, 'days').unix(),
    iat: moment().unix(),
    sub: user[0]
  }
  // console.log(payload);
  return jwt.encode(payload, TOKEN_SECRET);
}

function decodeToken(token, callback) {
  const payload = jwt.decode(token, TOKEN_SECRET)
  const now = moment().unix()
  //check if token has expired
  if (now > payload.exp) callback('Token has expired')
  else callback(null, payload)
}

module.exports = {
  encodeToken,
  decodeToken
}


//naming conventions
// exp: expiration date of the token
// iat: the time the token is generated
// sub: the subject of the token (the user whom it identifies)
