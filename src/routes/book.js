const {
  AsyncRouter
} = require("express-async-router");
const {
  check,
  validationResult
} = require("express-validator");

const jwtMiddleware = require("../middleware/jwt");
const Book = require("../models/Book");

const route = AsyncRouter();
// const createValidators = [
//   check("name").exists(),
//   check("user").exists()
// ];

// List
route.get("/list", async (req, res) => {

  const books = await Book.find();
  res.send(books);
});

route.post("/checkout", jwtMiddleware, async (req, res) => {

  const book = await Book.findOne({
    _id: req.body.id
  })

  if (book.user) {
    res.status(403).send("book is currently unavailable")
    return
  }
  book.user = req.user._id

  try {
    await book.save();
    res.status(200).send(
      book
    )
  } catch (error) {
    res.status(400).send(error.message);
  }
})

route.post("/return", jwtMiddleware, async (req, res) => {

  const book = await Book.findOne({
    _id: req.body.id
  })
  book.user = null

  try {
    await book.save();
    res.status(200).send(
      book
    )
  } catch (error) {
    res.status(400).send(error.message);
  }
})

module.exports = route