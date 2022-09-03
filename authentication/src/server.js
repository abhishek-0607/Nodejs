const app = require("./index");

const connect = require("./configs/db");

app.listen(8000, async function () {
  await connect();
  console.log("Listening to port 8000");
});
