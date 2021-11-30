const express = require("express");

const Section = require("./models/section")
const Author = require("./models/author")
const Book = require("./models/book")

const sectionController = require("./controller/section_controller");

const bookController = require("./controller/book_controller");

const authorController = require("./controller/author_controller");



const app = express();
app.use(express.json());

app.use("/sections",sectionController);
app.use("/books",bookController);
app.use("/authors",authorController);

module.exports = app;









