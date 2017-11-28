exports.seed = function(knex, Promise) {

  return knex('reviews').del()
    .then(function() {
      const reviews = [{
        title: 'sample review title 1',
        text: 'sample text 1',
        rating: 5,
        snack_id: 1234,
        user_id: 5678
      }, {
        title: 'sample review title 2',
        text: 'sample text 2',
        rating: 4,
        snack_id: 8282,
        user_id: 9090
      }]

      return knex('reviews').insert(reviews)
    })
}
