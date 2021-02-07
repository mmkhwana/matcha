const mysql = require('mysql');

con = mysql.createPool({
    host: 'matcha.cloudaccess.host',
    user: 'jolbbdyg',
    password: 'Khanyisa18',
    database: 'jolbbdyg',
    multipleStatements: true
});

module.exports = {'con': con, 'mysql': mysql};