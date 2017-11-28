const bcrypt = require('bcryptjs')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('somedata', salt);
      return knex('users').insert({
        email: 'fake@email.com',
        password: hash,
        first_name: 'Firsty',
        last_name: 'McLastname',
        admin: false
      })
    })
}
