const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./route/api/posts');
const cors = require('cors');
const app = express();
const http = require("http").Server(app)
const io = require("socket.io")(http);
let users = [];
let messages = [];
let index = 0;

io.on("connection", socket => {

    socket.emit('LoggedIn', {
        users: users.map(s => s.username),
        messages: messages
    })

    socket.on('newuser',username => {
        console.log(`${username} has joined`);
        socket.username = username;
        users.push(socket);

        io.emit('userOnline', socket.username);
    });

    socket.on('msg', msg => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg
        }

        messages.push(message);

        io.emit('msg',message);

        index++;
    })
    //Disconnection
    socket.on("disconnect", () => {
        console.log(`${socket.username} has left`);
        io.emit("userLeft",socket.username);
        users.splice(users.indexOf(socket), 1);
    })
})

app.use(cors());
app.use(bodyParser.json({limit : "100mb", extended: true}));
app.use('/api/posts', posts);
app.use(express.static('/route/api/uploads'));

const port = process.env.PORT || 5000;

http.listen(port, () =>  console.log(`Server start on port ${port}`));