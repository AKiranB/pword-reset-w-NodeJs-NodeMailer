const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const bcryptSalt = process.env.BCRYPT_SALT;

// TODO: Please make sure you edit the user model to whatever makes sense in this case

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: String,
});




// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//   this.password = hash;
//   next();
// });

const User = model("User", userSchema);

module.exports = User;
