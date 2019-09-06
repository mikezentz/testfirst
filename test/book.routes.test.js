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
    this.user = loginUser.body
    await bookGen(3)
  })

  it("GET /books/list should return a JSON object of all available books", async () => {
    const response = await chai
      .request(app)
      .get("/books/list")

    expect(response.body).to.exist
  })

  it("POST /books/checkout should allow an authenticated to checkout a book", async function() {
    const book = await Book.findOne({})
    const response = await chai
      .request(app)
      .post("/books/checkout")
      .set("Authorization", `Bearer ${this.user.token}`)
      .send({
        id: book._id
      })
    expect(response.body.title).to.equal(book.title)


  })
})