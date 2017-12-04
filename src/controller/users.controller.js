const bcrypt = require('bcryptjs')
const knex = require('../db/knex')
const Controller = require('./Controller')('users')
const Model = require('../model/user.model')
const Token = require('../model/Token.model')

class UsersController extends Controller {
  
  static isAuthenticated (req, res, next) {
    const bearer = req.headers.authorization
    Model.isAuthenticated(bearer)
      .then(() => next())
      .catch(next)
  }

  static isAdminOrIsUser (req, res, next) {
    const bearer = req.headers.authorization
    const id = req.params.id
    Model.isAdminOrIsUser(id, bearer).then (result => {
      if(result) next()
      else next({ message: 'Not authorized' })
    })
  }

  static isAdmin (req, res, next) {
    const bearer = req.headers.authorization
    Model.isAdmin(bearer)
      .then(() => next())
      .catch(next)
  } 

  static createUser(req) {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(req.body.password, salt)

    // this is the only remaining DB call in this file. Factor out??
    return knex('users')
      .insert({
        email: req.body.email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      })
      .returning('id').into('users');
  }

  static registerUser (req, res, next) {
    return UsersController.createUser(req)
      .then(user => { return Token.signToken(user) })
      .then((token) => {
        res.status(200).json({
          status: 'success',
          token: token
        })
      })
      .catch((err) => {
        res.status(500).json({
          status: err
        })
      })
  }

  static loginUser (req, res, next) {
    const email = req.body.email
    const password = req.body.password
    return Model.getUserByEmail(email)
      .then((response) => {
        UsersController.comparePass(password, response.password)
        return response
      })
      .then((response) => { 
        return Token.signToken(response) 
      })
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

  static comparePass(userPassword, dbPassword) {
    const bool = bcrypt.compareSync(userPassword, dbPassword)
    if (!bool) throw new Error('invalid pass')
    else return true
  }

}

module.exports = UsersController
