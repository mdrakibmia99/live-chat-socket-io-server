const express = require('express');
const app = express();
const http = require('http');
const cors=require('cors')
const expressServer = http.createServer(app);
app.use(cors())
const { Server } = require("socket.io");
const io = new Server(expressServer,{
    cors:{
        origin:"http://localhost:3000"
    }

});



io.on('connection', (socket) => {
  console.log('a user connected');
 socket.on('join_room',(data)=>{
    socket.join(data);
    console.log(`join room id:${socket.id} and room=${data}`)
 })

  socket.on('disconnect',()=>{
     console.log('user disconnected')
  })
});

expressServer.listen(5000, () => {
  console.log('listening on @5000');
});