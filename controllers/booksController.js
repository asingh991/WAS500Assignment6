const book = require("../models/books.js");

exports.getAllbooks = (req, res, next) => {
  book.find({}, (error, books) => {
    if (error) next(error);
    req.data = books;
    next();
  });
};

exports.getbookPage = (req, res) => {
  res.render("contact");
};

exports.savebook = (req, res) => {
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
  });
};