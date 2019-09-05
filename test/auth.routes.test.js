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
  it("POST /auth/sign-up should allow users to sign-up", async () => {
    const response = await chai;
    request(app)
      .post("/auth/sign-up")
      .send(validUser);

    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal(validUser.username);
    expect(response.body.password).to.equal(undefined);
  });
  it("POST /auth/sign-up");
});
