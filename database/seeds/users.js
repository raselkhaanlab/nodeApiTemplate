
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
         {name:'rasel',email:'rko@g.com',number:'12',password:'1222'}
      ]);
    });
};
