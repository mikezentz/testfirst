const chai = require("chai");
const {
  expect
} = chai;
const jwt = require("jsonwebtoken");
const {
  app
} = require("../src/server");
const User = require("../src/models/User");


const validUser = {
  username: "validuser",
  password: "validpassword",
  passwordCheck: "validpassword"
};

const invalidUser = {
  username: "invaliduser",
  password: "validpassword",
  passwordCheck: "invalidpassword"
};

describe("auth.routes.js", () => {
  it("POST /auth/sign-up should allow users to sign-up", async () => {
    const response = await chai
      .request(app)
      .post("/auth/sign-up")
      .send(validUser);

    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal(validUser.username);
    expect(response.body.password).to.equal(undefined);
  });
  it("POST /auth/sign-up should not allow existing users to sign-up", async () => {
    const response = await chai
      .request(app)
      .post("/auth/sign-up")
      .send(validUser);

    expect(response.status).to.equal(406);
  })
  it("POST /auth/sign-up should not allow mismatched passwords", async () => {
    const response = await chai
      .request(app)
      .post("/auth/sign-up")
      .send(invalidUser);

    expect(response.status).to.equal(400)
  })
  it("POST /auth/login should allow a valid user to login", async () => {
    const response = await chai
      .request(app)
      .post("/auth/login")
      .send(validUser)

    const {
      username
    } = validUser
    const user = await User.findOne({
      username
    })
    const sanitizeUser = (user) => ({
      ...user.toJSON(),
      password: undefined,
    })
    const token = jwt.sign(sanitizeUser(user), "SecretSecret", {
      expiresIn: "2 days"
    })
    expect(response.body.token).to.eq(token)
  })
  it("POST /auth/login should deny nonexistent users", async () => {
    const response = await chai
      .request(app)
      .post("/auth/login")
      .send(invalidUser)

    expect(response.status).to.eq(403)
  })
  it("POST /auth/login should not allow incorrect passwords", async () => {
    const response = await chai
      .request(app)
      .post("/auth/login")
      .send({
        username: "validuser",
        password: "invalidpassword"
      })

    expect(response.status).to.eq(403)
  })
});