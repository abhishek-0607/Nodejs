const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const { log } = require("console");

const httpServer = http.createServer((req, res) => {
  const index = fs.readFileSync(__dirname + "/index.html", "utf-8");
  res
    // .writeHead(200, {
    //   "Content-type": "text/html",
    // })
    .end(index);
});
let totalUsers = 0;
const ws = new Server(httpServer);
ws.on("connection", (conn) => {
  totalUsers += 1;
  // conn.on("disconnect", () => {
  //   totalUsers -= 1;
  //   console.log("a user disconnected! Total Users->", totalUsers);
  // });

  conn.on("new message", (message) => {
    //emitting the event on the server which is emitted by a User
    ws.emit("new message", message);
    // console.log("client message->", message);
  });
  console.log("a new user connected! Total users->", totalUsers);
});
httpServer.listen(8000, () => {
  console.log("Server Started");
});
