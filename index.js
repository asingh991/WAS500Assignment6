mongoose = require("mongoose");
books = require("./models/book.js");
//const booksController = require("./controllers/booksController")
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3000);

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

require("dotenv").config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.get("/home", (req,res) => {
  console.log(`Received an incoming request...`, req.url);
  res.render('index.ejs');
}
);
app.get("/booksList", (req,res) => {
  console.log(`Received an incoming request...`, req.url);
  res.render('books.ejs');
}
);
app.get("/books/:bookID", (req,res) => {
  console.log(`Received an incoming request...`, req.url);
  let id = req.params.bookID;
  res.render('book'+id+'.ejs');
}
);
app.get("/admin", (req,res) => {
  console.log(`Received an incoming request...`, req.url);
  res.render('admin.ejs');
}
);
app.get("/edit/:bookID", (req,res) => {
  console.log(`Received an incoming request...`, req.url);
  let id = req.params.bookID;
  res.render('edit'+id+'.ejs');
}
);
/*app.get("/books", booksController.getAllbooks,(req, res, next) => {
    console.log(req.data);
    res.render("books", { books: req.data });
  }
);*/
/*
app.get("/contact", booksController.getbookPage);
app.post("/subscribe", booksController.savebook);
*/
app.listen(app.get("port"), () => {
  console.log(`Server running @ http://localhost:${app.get("port")}`);
});

