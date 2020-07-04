
exports.up = knex => knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username');
    table.string('email');
    table.string('password');

    table.timestamps();
});

exports.down = knex => knex.dropTable('users');
