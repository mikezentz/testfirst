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
    this.token = loginUser.body.token
    await bookGen(3)
  })

  it("GET /books/list should return a JSON object of all available books", async () => {
    const response = await chai
      .request(app)
      .get("/books/list")

    expect(response.body).to.exist
    console.log(response.body)
  })

  it("POST /books/checkout should allow an authenticated to checkout a book", async function() {
    const book = await Book.findOne({})
    const response = await chai
      .request(app)
      .set("Authorization", `Bearer ${this.token}`)
      .post("/books/checkout")
      .send({
        id: book._id
      })

  })
})