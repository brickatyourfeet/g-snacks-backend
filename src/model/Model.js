const db = require('../db/knex')

module.exports = (tableName) => {
  class Model {
    constructor () {}

    static index() {
      return db(tableName)
    }

    static show(id) {
      return db(tableName).where({id}).first()
    }

    static create(body) {
      return db(tableName).insert(body).returning('*')
    }

    static update(id, body) {
      return db(tableName).where({ id }).update(body).returning('*')
    }

    static delete(id) {
      return db(tableName).where({ id }).returning('*').del()
    }
  }

  return Model
}