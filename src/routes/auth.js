const {
  AsyncRouter
} = require("express-async-router");
const bcrypt = require("bcrypt");
const {
  check,
  validationResult
} = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const route = AsyncRouter();


// const signUpValidators = [
//   check("username").exists().isLength({
//     min: 4,
//     max: 32
//   }),
//   check("password").exists().isLength({
//     min: 8,
//     max: 64
//   }),
//   check("passwordConfirm").exist().isLength({
//     min: 8,
//     max: 64
//   }),
// ];
//
// const loginValidators = [
//   check("username").exists().isLength({
//     min: 4,
//     max: 32
//   }),
//   check("password").exists().isLength({
//     min: 8,
//     max: 64
//   }),
// ];

route.post("/sign-up", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      errors: errors.array()
    });

  }
  const {
    username,
    password,
    passwordCheck
  } = req.body;
  if (password !== passwordCheck) {
    res.send(400).send({
      error: `password does not match!`
    });
    return;
  }
  const userFound = await User.findOne({
    username
  })

  if (userFound) {
    return res.status(406)
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({
    username: username,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.send({
      ...user._doc,
      password: undefined,
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = route;