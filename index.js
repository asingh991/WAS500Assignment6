mongoose = require("mongoose");
books = require("./models/book.js");
//booksController = require("./controllers/booksController")
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
app.get("/addnewbook", (req,res) => {
  console.log(`Received an incoming request...`, req.url);
  res.render('addnewbook.ejs');
}
);
/*
app.post("/subscribe", booksController.savebook);
*/
app.post("/updated/:bookID", (req, res) => {
  let id = req.params.id;
  books.findByIdAndUpdate(id, {
      name: req.body.name,
      author: req.body.author}, 
    (error, book) => {
      if (error) res.send(error);
      req.data = book;
      res.locals.redirect = "/admin";
  });
  //let redirectPath = res.locals.redirect;
    //if (redirectPath) res.redirect(redirectPath);
    //else next();
});
app.delete("/delete/:bookID", (req, res) => {
  let id = req.params.id;
  books.findByIdAndDelete(id, {
      name: req.body.name,
      author: req.body.author}, 
    (error, book) => {
      if (error) res.send(error);
      req.data = book;
      res.locals.redirect = "/admin";
  });
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    //else next();
  },
);
app.post("/newBook", (req, res) => {
  let bookdetails = new books({
    name: req.body.name,
    authorName: req.body.authorName,
  });
  bookdetails.save((error, result) => {
    if (error) res.send(error);
    res.locals.redirect = "/admin";
  })
});
app.listen(app.get("port"), () => {
  console.log(`Server running @ http://localhost:${app.get("port")}`);
});

