const express = require("express");
const users = require("./users.json")
const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Welcome to Home Page");
})

app.get("/users", (req,res)=>{
    res.send({users});
})
app.post("/", (req,res)=>{
    const newUsers =[...users, req.body];
    res.send(newUsers);
})
app.patch("/:email",(req,res)=>{

    let a = {};
    a.name = "abhishek silawat"
    const newUsers = users.map((user)=>{
        if(req.params.email === user.email){
            if(req?.body?.first_name) user.first_name = req.body.first_name
            if(req?.body?.last_name) user.last_name = req.body.last_name
            if(req?.body?.email) user.email = req.body.email
            if(req?.body?.gender) user.gender = req.body.gender

        }
        a.name = "Nrupul"
        return user;
    })
    res.json({newUsers, a});

});

app.delete("/:email", (req,res)=>{
    const newUsers = users.filter((user)=> user.email !== req.params.email);
    res.send(newUsers);
})

app.listen(1111, function(){
    console.log("listening on port 1111");
})
