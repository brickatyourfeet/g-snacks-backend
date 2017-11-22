exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('text');
    table.integer('rating');
    table.integer('snack_id');
    table.integer('user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
