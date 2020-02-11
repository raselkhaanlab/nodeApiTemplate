
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
      table.increments('user_id').primary();
      table.string('email').notNull();
      table.string('password').notNull();
      table.text('first_name').notNull();
      table.text('last_name').notNull();
      table.string('number').notNull();
      table.timestamps(true,true);
    });
  };
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
