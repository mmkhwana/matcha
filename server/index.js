const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./route/api/posts');
const Connection = require('./route/api/dbconnection');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json({limit : "50mb", extended: true}));
app.use('/api/posts', posts);
app.use(express.static('/route/api/uploads'));

Connection.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
// var sql = "INSERT INTO Matcha_Users (user_name, user_email) VALUES ('Company Inc', 'Highway 37')";
// Connection.query(sql, function (err, result) {
// if (!err)
// {
//     console.log("1 record inserted");
// }
// else
// {
//     console.log(err);
//     return;
// }
// });
const port = process.env.PORT || 5000;

app.listen(port, () =>  console.log(`Server start on port ${port}`));