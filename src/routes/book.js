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
const createValidators = [
  check("name").exists(),
  check("user").exists()
];

// List
route.get("/list", async (req, res) => {
<<<<<<< HEAD
    const books = await Book.find();
    res.send(books);
});

route.post("")

=======
  const books = await Book.find();
  res.send(books);
});

module.exports = route
>>>>>>> 10b3fee410bec94cadb04e4f3e73015ff557686a
