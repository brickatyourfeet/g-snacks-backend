const db = require('../db/knex')

module.exports = (tableName) => {
  class Model {
    static index() {
      return db(tableName)
    }

    static show(id) {
      return db('tableName').where({id}).first()
    }
  }
}