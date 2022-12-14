const book = require("../models/books.js");

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
exports.updateBook = (req, res) => {
  let id = req.params.id;
  books.findByIdAndUpdate(id, {
      name: req.body.name,
      author: req.body.author}, 
    (error, book) => {
      if (error) res.send(error);
      res.locals.redirect = "/admin";
  });
};
exports.deleteBook = (req, res) => {
  let id = req.params.id;
  books.findByIdAndDelete(id, {
      name: req.body.name,
      author: req.body.author}, 
    (error, book) => {
      if (error) res.send(error);
      res.locals.redirect = "/admin";
  });
};