var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: false },
  createdAt: { type: Date, default: Date.now },
});

//hashing the password before it is logged in
const SALT_FACTOR = 10;
userSchema.pre("save", function (done) {
  var user = this;
  if (!user.isModified("password")) {
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) {
        return done(err);
      }

      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function (guess, done) {
  if (this.password != null) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
      done(err, isMatch);
    });
  }
};

var User = mongoose.model("User", userSchema);

module.exports = User;
