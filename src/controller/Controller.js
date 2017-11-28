const capitalize = require('lodash/capitalize')
const pluralize = require('pluralize')

module.exports = name => {
  const singular = pluralize.singular(name)
  const modelName = capitalize(singular)
  const Model = require(`../model/${modelName}.model`)

  const errorHandler = next => {
    return error => {
      console.error(error)

      const status = 400
      const message = `Please check your request and try again`
      next({ status, message })
    }
  }

  class Controller {
    static index (req, res, next) {
      Model.index()
      .then(response => res.json({ [pluralize(name)]: response }))
      .catch(errorHandler(next))
    }

    static show(req, res, next) {
      Model.show(req.params.id)
        .then(response => res.json({ [pluralize(name)]: response }))
    }

    static create(req, res, next) {
      Model.create(req.body)
        .then(response => res.json({ [pluralize.singular(name)]: response }))
    }

    static update(req, res, next) {
      Model.update(req.params.id, req.body)
        .then(response => res.json({ [pluralize.singular(name)]: response }))
    }

    static delete(req, res, next) {
      Model.delete(req.params.id)
        .then(response => res.json({ [pluralize.singular(name)]: response }))
    }
  }

  return Controller
}