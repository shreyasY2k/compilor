const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  loggedInAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
