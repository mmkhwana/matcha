const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./route/api/posts');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(bodyParser.json({limit : "100mb", extended: true}));
app.use('/api/posts', posts);
app.use(express.static('/route/api/uploads'));

const port = process.env.PORT || 5000;

app.listen(port, () =>  console.log(`Server start on port ${port}`));