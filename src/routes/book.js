const { AsyncRouter } = require("express-async-router");
const { check, validationResult } = require("express-validator");

const jwtMiddleware = require("../middleware/jwt");
const Book = require("../models/Book");

const router = AsyncRouter();
const createValidators = [
    check("name").exists(),
    check("user").exists()
];

// List
router.get("/list", async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

