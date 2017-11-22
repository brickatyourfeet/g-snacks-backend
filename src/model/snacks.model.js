const knex = require('../db/knex')

const getAllSnacks = () => knex('snacks')

module.exports = {
  getAllSnacks
}