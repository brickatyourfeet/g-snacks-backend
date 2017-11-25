const bcrypt = require('bcryptjs')
const knex = require('../db/knex')
const localAuth = require('./local')

function createUser(req) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(req.body.password, salt)
  return knex('users')
    .insert({
      email: req.body.email,
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    })
    .returning('id').into('users');
}

function getUser(email) {
  return knex('users').where({ email }).first()
}

function comparePass(userPassword, dbPassword) {
  const bool = bcrypt.compareSync(userPassword, dbPassword)
  if (!bool) throw new Error('invalid pass')
  else return true
}

function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Log in is required'
    });
  }
  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  localAuth.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token has expired'
      });
    } else {
      // check if the user still exists in the db
      return knex('users').where({ id: parseInt(payload.sub) }).first()
        .then((user) => {
          next();
        })
        .catch((err) => {
          res.status(500).json({
            status: 'error'
          });
        });
    }
  });
}


module.exports = {
  createUser,
  getUser,
  comparePass,
  ensureAuthenticated
}
