const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: 'localhost',
    user: 'lucaspaz',
    password: 'Geraldo123@',
    database: 'teste_webmotors' });

module.exports = connection;
