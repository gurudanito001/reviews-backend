const User = require("../models/User");

function UserService() {
  return {
    add: data => new User(data).save(),
    findEmail: email => User.findOne({ email: email})
  };
}

module.exports = UserService();