const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./route/api/posts');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json({limit : "50mb", extended: true}));
app.use('/api/posts', posts);
app.use(express.static('/route/api/uploads'));
// app.get('/', function(req, res){
//     res.send('<h1>Hello world</h1>');
//   });

const port = process.env.PORT || 5000;

app.listen(port, () =>  console.log(`Server start on port ${port}`));