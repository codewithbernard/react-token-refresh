const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

// No need to export mongoose code. Mongoose can be confused when trying
// to create multiple models with same name
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Don't expose password
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, opt) => {
    delete ret["password"];
    delete ret["_id"];
    delete ret["__v"];
    return ret;
  },
});

userSchema.pre("save", function (next) {
  // Hash the password with a salt
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  this.password = hash;

  next();
});

// checks if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model("users", userSchema);
