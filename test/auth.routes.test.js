const chai = require("chai");
const {expect} = chai;
const jwt = require("jsonwebtoken");
const {app} = require("../src/server");

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
  it("POST /auth/ should allow users to sign-up", async () => {
    const response = await chai;
    request(app)
      .post("/auth/sign-up")
      .send(validUser);

    expect(response.status).to.equal(200);
  });
});
