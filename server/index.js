const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = require('./route/api/posts');

app.use('/api/posts', posts);
app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
  });

const port = process.env.PORT || 5000;

app.listen(port, () =>  console.log(`Server start on port ${port}`));