const bcrypt = require('bcrypt');

// const secretWord = `i love cat's`;

function hashPassword(password){
    return bcrypt.hashSync(password);
}

function comparePassword(password, passwordHash){
    return bcrypt.compareSync(password, passwordHash);
}

module.exports = [hashPassword, comparePassword];