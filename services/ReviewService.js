const Review = require("../models/Review");

function ReviewService() {
  return {
    add: data => new Review(data).save(),
    delete: id => Review.findByIdAndRemove(id),
    validated: ()=> Review.find({ validated: true }),
    unValidated: ()=> Review.find({ validated: false }),
    validate: (id)=> Review.findByIdAndUpdate({ _id: id },{ validated: true },
        /* function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        } */)
  };
}

module.exports = ReviewService();
