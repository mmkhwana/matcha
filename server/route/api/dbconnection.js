const mysql = require('mysql');
const faker = require('faker');

con = mysql.createPool({
    host: 'matcha.cloudaccess.host',
    user: 'lpnwzqqm',
    password: 'Khanyisa18',
    database: 'lpnwzqqm',
    multipleStatements: true
});

var sql = " CREATE TABLE IF NOT EXISTS faker_users (user_first_name VARCHAR(255), user_last_name VARCHAR(255))";
con.query(sql, function (err, result) {
    if (err) throw err
    console.log("Table Created");
});

con.getConnection((error, connect) => 
{
    function generateUser() {
        let users = []
        for (let id = 1; id <= 5; id++) {
            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();

            sql = "INSERT INTO lpnwzqqm.faker_users (user_first_name, user_last_name) VALUES (?, ?)";
            connect.query(sql, [firstName, lastName], function (err, result) {
                if (err) throw err;
                console.log(result);

                users.push({
                    "id": id,
                    "first_name": firstName,
                    "last_name": lastName
                });
            });
        }

    }
    generateUser()
    console.log('500 records inserted');
})

module.exports = {'con': con, 'mysql': mysql};
