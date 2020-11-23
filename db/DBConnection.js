const mongoose = require("mongoose");
const keys = require("../config/keys")

const serverURI = keys.mongoURI;

class DBConnection {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(serverURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
        console.log( err);
      });
  }
}

module.exports = new DBConnection();
