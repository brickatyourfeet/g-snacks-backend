const knex = require('../db/knex')
const Model = require('./Model')('users')
const Token = require('./Token.model')

class User extends Model {
  static isAuthenticated (token) {
    return Token.parseTokenAsync(token).catch(error => {
      throw new Error(`You are not authorized to access that route`)
    })
  }

  static isUser (id, token) {
    return Token.parseTokenAsync(token).then(payload => {
      if(payload.sub.id === parseInt(id)) return true
      else throw new Error('User is not authorized')
    })
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

  static isAdminOrIsUser (id, bearer) {
    return Token.parseTokenAsync(bearer).then(payload => {
      console.log(payload)
      return this.show(payload.sub.id).then(user => {
        console.log(user)
        if((user.admin) || (payload.sub.id === id)) {
          return true
        } else {
          return false
        }

      })
    })
  }
}

module.exports = User
