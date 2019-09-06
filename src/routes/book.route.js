const { AsyncRouter } = require("express-async-router");
const Book = require("../models/Book");

const router = AsyncRouter();

// List
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

//create
router.post("/", [])