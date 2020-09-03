const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

// No need to export mongoose code. Mongoose can be confused when trying
// to create multiple models with same name
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Don't expose password
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, opt) => {
    delete ret["password"];
    return ret;
  },
});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checks if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model("users", userSchema);
