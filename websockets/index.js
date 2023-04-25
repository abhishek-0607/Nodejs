const http = require("http");
const { Server } = require("socket.io");

const httpserver = http.createServer((req, res) => {
  res.end("hello");
});
const ws = new Server(httpserver);
ws.on("connection", (ws) => {
  console.log("a new user connected");
});
httpserver.listen(8000, () => {
  console.log("server started");
});
