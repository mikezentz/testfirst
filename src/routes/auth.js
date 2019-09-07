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

const sanitizeUser = (user) => ({
  ...user.toJSON(),
  password: undefined,
})
route.post("/sign-up", async (req, res) => {

  const {
    username,
    password,
    passwordCheck,
    admin
  } = req.body;

  console.log("the request " + admin, req.body)

  if (password !== passwordCheck) {
    res.status(400).send({
      error: `password does not match!`
    });
    return;
  }
  const userFound = await User.findOne({
    username
  })

  if (userFound) {
    return res.sendStatus(406)
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({
    username: username,
    password: hashedPassword,
    admin: admin
  });

  console.log("prior to save ", user, admin)
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

route.post("/login", async (req, res) => {
  const {
    username,
    password
  } = req.body

  const user = await User.findOne({
    username
  })
  if (!user) return res.sendStatus(403)

  const correctPassword = bcrypt.compareSync(password, user.password)
  if (!correctPassword) return res.sendStatus(403)

  const token = jwt.sign(sanitizeUser(user), "SecretSecret", {
    expiresIn: "2 days"
  })

  res.send({
    token
  })

})

module.exports = route;