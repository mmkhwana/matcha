const mysql = require('mysql');

con = mysql.createPool({
    host: 'matcha.cloudaccess.host',
    user: 'lpnwzqqm',
    password: 'Khanyisa18',
    database: 'lpnwzqqm',
    multipleStatements: true
});

module.exports = {'con': con, 'mysql': mysql};