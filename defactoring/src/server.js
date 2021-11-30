const app = require("./app");
const connect = require("./configs/db")

app.listen(8823, async function(){
    await connect();
    console.log("Listening to PORT 8823");
})