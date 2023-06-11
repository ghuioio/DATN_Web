var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);
const rasaServerId = new Map();
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
  }); 
  // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 


socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id); 

  // socket.on("registerRasaServer", function(data) =>)
  socket.on("sendDataFromClientToServer", function(data) {
    console.log(data);
    socketIo.emit("sendDataToRasa", {id: socket.id, data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("sendDataFromRasaToServer", function(data) {
    console.log(data);
    socketIo.to(data.id).emit("sendDataToClient", { data: data.data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

server.listen(5000, () => {
    console.log('Server đang chay tren cong 5000');
});
