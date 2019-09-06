const chai = require("chai");
const {
  expect
} = chai;
const jwt = require("jsonwebtoken");
const {
  app
} = require("../src/server");
const User = require("../src/models/User");
const Book = require("../src/models/Book");
const bookGen = require("../src/helpers/createbooks")

describe("book.routes.js", () => {
  before(async function() {
    const validUser = {
      username: "validuser",
      password: "validpassword",
      passwordCheck: "validpassword"
    };
    const signupUser = await chai
      .request(app)
      .post("/auth/sign-up")
      .send(validUser);
    const loginUser = await chai
      .request(app)
      .post("/auth/login")
      .send(validUser)
    const token = loginUser.body.token
    await bookGen(100000000)
  })

  it("Can we make books", async () => {
    const books = await Book.find()
    console.log(books)
    expect(books).to.exist
  })

  it("GET /books/list should return a JSON object of all available books", async () => {
    const response = await chai
      .request(app)
      .get("/books/list")

    expect(response.body).to.exist
    console.log(response.body)
  })
})