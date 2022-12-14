mongoose = require("mongoose");
books = require("./models/book.js");
booksController = require("./controllers/booksController")
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
/*
app.post("/subscribe", booksController.savebook);
*/
app.post("/updated/:bookID", booksController.updateBook, booksController.redirectView);
app.post("/book", exports.savebook = (req, res) => {
  let newbook = new book({
    id: req.body.id,
    name: req.body.name,
    authorName: req.body.authorName,
    description: req.body.description,
    bookImage: req.body.bookImage,
  });
  newbook.save((error, result) => {
    if (error) res.send(error);
    res.render("thanks");
  });}
);
app.listen(app.get("port"), () => {
  console.log(`Server running @ http://localhost:${app.get("port")}`);
});

