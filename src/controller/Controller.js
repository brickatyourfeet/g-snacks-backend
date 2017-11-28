const capitalize = require('lodash/capitalize')
const pluralize = require('pluralize')

module.exports = name => {
  const singular = pluralize.singular(name)
  const modelName = capitalize(singular)
  const Model = require(`../model/${modelName}.model`)

  class Controller {
    static index (req, res, next) {
      Model.all()
      .then(response => res.json({ [pluralize(name)]: response }))
      .catch(errorHandler(next))
    }
  }
}