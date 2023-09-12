const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);


//here we created a io server with the help of http server
const io = new Server(server, {
    cors : {
        origin : 'http://localhost:3000',
        method : ['GET', 'POST']
    }
})

//Now we are creating a instance of the io server to connect
io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx

    socket.on("joinRoom" , (room) => {
        // console.log(room)
        socket.join(room)
    })
    socket.on("newMessage", ({newMsg, room}) => {
        // console.log(room, newMsg)
        //Now we get this msg in backend now we will broadcast this msg to all users
        //we can use socket.emit but as in the documentation we will use io.on(room1)
        io.in(room).emit("getLatestMessage", newMsg);
    })
});


app.get('/', (req, res) => {
      res.send("sccket Chat started")
})

server.listen(8000, () => {
    console.log('server started on 8000')
})