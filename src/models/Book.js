const mongoose = require("mongoose");
const {
  Schema
} = mongoose;
const {
  ObjectId
} = Schema.Types;

const bookSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
  },
  due_date: {
    type: Date,
  },
  user: {
    type: String,

  }
})
const Book = mongoose.model("Book", bookSchema);
module.exports = Book