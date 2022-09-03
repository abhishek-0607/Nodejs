const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to my express js");
});
app.get("/about", (req, res) => {
  res.send("we are at about us page");
});
app.get("/contact", (req, res) => {
  res.send("my contact no is 8823070602");
});
app.listen(8080, () => {
  console.log("listening to PORT 8080");
});
