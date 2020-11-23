const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  validated: {
    type: Boolean,
    required: true
  }
});

module.exports  = mongoose.model("Review", ReviewSchema);
