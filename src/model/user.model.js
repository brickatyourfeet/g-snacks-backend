const knex = require('../db/knex')
const Model = require('./Model')('users')
const Token = require('./Token.model')

class User extends Model {
  static isAuthenticated (token) {
    console.log(token)
    return Token.parseTokenAsync(token).catch(error => {
      throw new Error(`You are not authorized to access that route`)
    })
  }

  static isUser (id, token) {

  }

  static isAdmin (bearer) {
    const token = bearer.split(' ')[1]
    return Token.parseTokenAsync(token).then(payload => {
      return knex('users').where({ id: parseInt(payload.sub.id) }).first()
        .then(user => {
          if(!user.admin) throw new Error('User is not authorized')
          else return true
        })
    })
  }
}

module.exports = User
