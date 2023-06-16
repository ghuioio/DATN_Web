var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);
const socketIoClient = require('socket.io-client');
const rasaSocket = socketIoClient.connect('http://localhost:5005');
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
  }); 

socketIo.on("connection", (socket) => { 
  console.log("New client connected" + socket.id); 

  // socket.on("registerRasaServer", function(data) =>)
  socket.on("sendDataFromClientToServer", function(data) {
    console.log('sendDataFromClientToServer ' +data);
    socketIo.emit("sendDataToRasa", {id: socket.id, data });
  })

  socket.on("sendDataFromRasaToServer", function(data) {
    console.log("sendDataFromRasaToServer "+ data);
    socketIo.to(data.id).emit("sendDataToClient", { data: data.data });
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
    console.log('Server đang chay tren cong 5000');
});
