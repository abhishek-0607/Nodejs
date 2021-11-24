const express = require("express");

const books = require("./books.json");
const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
  res.send({books});
})



app.post("/books",(req,res)=>{
  const newBooks =[...books, req.body];
    res.send(newBooks);
})

app.get("/books/:id",(req,res)=>{
  const newBooks = books.filter((book)=> { return book.id == req.params.id} );
  //console.log(req.params.id);
  //console.log(books);

    res.send(newBooks);
});
app.patch("/books/:id", (req,res)=>{
  console.log(req.params);
  const newBooks = books.map((book)=>{
    if(book.id == req.params.id){
      if(req?.body?.author) book.author = req.body.author;
      if(req?.body?.year) book.year = req.body.year;
    }
    return book;
  });
  res.json({newBooks})
})
app.delete("/books/:id",(req,res)=>{
  const newBooks = books.filter((book)=> { return book.id != req.params.id} );


    res.send(newBooks);
});


app.listen(1122,function(){
  console.log("1122 port is ready")
})
