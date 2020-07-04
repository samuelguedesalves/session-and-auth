
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'samuel', email: 'samuel@gmail.com', password: 'secret'},
        {id: 2, username: 'samuel', email: 'samuel@gmail.com', password: 'secret'},
        {id: 3, username: 'samuel', email: 'samuel@gmail.com', password: 'secret'},
      ]);
    });
};
