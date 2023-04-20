const { EventEmitter } = require("events");

const myEventEmmiter = new EventEmitter();

//listen
myEventEmmiter.on("click", () => {
  console.log("myEventEmmiter executed");
});

setTimeout(() => {
  //emit, trigger execute and event
  myEventEmmiter.emit("click");
}, 3000);
