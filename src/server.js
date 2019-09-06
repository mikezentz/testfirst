const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const AuthRoute = require("./routes/auth")
const BookRoute = require("./routes/book")

const app = express();
app.use(express.json());
app.use(cors());
if (process.env.ENV !== "test") app.use(morgan("tiny"));

app.use("/auth", AuthRoute);
app.use("/books", BookRoute)


const connectDatabase = async (name, host = "localhost") => {
  return await mongoose.connect(`mongodb://${host}/${name}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
}

module.exports = {
  app,
  connectDatabase,
};