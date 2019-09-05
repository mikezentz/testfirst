const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = Schema({
    Name: {
        type: String,
        required: true,
    }
})