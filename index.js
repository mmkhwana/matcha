/*const express = require('express');
const server = express();
const path = require('path');
const bodyParser = require('body-parser');
var port = 8080;
server.use(bodyParser.urlencoded({extended : false}));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'node_modules')));
server.listen(port,() => {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});*/

const express = require('express');
const bodyParser = require("bodyParser");
const app = express();
app.use(bodyParser.json());
const path = require('path');

const db = require("./db");
const collection = "Users";

db.connect((err)=>{
    if(err){
        console.log('unable to connect');
        process.exit(1);
    }
    else{
        app.listen(3000,()=>{
            console.log('connected to databae' );
        });
    }
});