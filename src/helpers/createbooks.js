const faker = require("faker")
const Book = require("../models/Book");

const bookGen = async (count) => {
  for (let i = 0; i < count; i++) {
    const book = new Book({
      title: faker.lorem.words(),
      available: false,
      due_date: null,
      user: null
    });

    try {
      await book.save();
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = bookGen