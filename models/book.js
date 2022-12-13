const mongoose = require("mongoose"),
  bookSchema = mongoose.Schema({
    id: Number,
    name: String,
    authorName: String,
    description: String,
    bookImage: String,
  });
module.exports = mongoose.model("Book", bookSchema);