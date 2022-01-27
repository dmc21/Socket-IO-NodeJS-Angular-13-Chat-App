const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.153:4200",
    methods: ["GET", "POST"]
  }
});


app.get('/api', (req, res) => {
  res.send("Api Home")
});


app.get('/api/test', (req, res) => {
  res.send({message: "Esto es una prueba para saber si es problema de socketIO o reside en el node que corre Angular (CORS :( )"});
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("message", (d) => {

    io.emit("message", d);
    
  })

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});