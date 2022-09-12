const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
