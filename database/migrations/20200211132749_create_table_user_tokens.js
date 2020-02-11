
exports.up = function(knex) {
  return knex.schema.createTable('user_tokens',(table)=>{
    table.increments('id').primary().unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.text('access_token').notNullable();
    table.text('refresh_token').notNullable();
    table.timestamps(true,true);
    table.foreign('user_id').references('users.user_id').onUpdate('CASCADE') 
    .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_tokens');
};
