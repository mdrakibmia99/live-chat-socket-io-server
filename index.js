const express = require('express');
const app = express();
const http = require('http');
const cors=require('cors')
const expressServer = http.createServer(app);
app.use(cors())
const Port=process.env.PORT || 5000;
const { Server } = require("socket.io");
const io = new Server(expressServer,{
cors:{
        origin:"http://localhost:3000/"

    }

});

app.get('/', (req, res) => {
  res.send('<h1>Live Chat server is running</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // join a room
 socket.on('join_room',(data)=>{
    socket.join(data);
    console.log(`join room id:${socket.id} and room=${data}`)
 })

//   send data form client site 
 socket.on('send_message',(data)=>{
   socket.to(data.roomId).emit('receive_message',data)
 })
  socket.on('disconnect',()=>{
     console.log('user disconnected')
  })
});

expressServer.listen(Port, () => {
  console.log(`listening on @ ${Port}`);
});