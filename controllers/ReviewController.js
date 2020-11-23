const Review = require("../services/ReviewService");

function ReviewController() {
  const addReview = function(req, res) {
    Review.add(req.body).then(data => res.json(data));
  };

  const deleteReview = function(req, res) {
    Review.delete(req.params.id).then(data => res.json(data));
  };

  const getValidatedReviews = function(req, res) {
    Review.validated().then(data => res.json(data));
  };

  const getUnvalidatedReviews = function(req, res) {
    Review.unValidated().then(data => res.json(data));
  };

  const validateReview = function(req, res) {
    Review.validate(req.params.id).then(data => res.json(data));
  };

  return {
    add: addReview,
    delete: deleteReview,
    getValidated: getValidatedReviews,
    getUnvalidated: getUnvalidatedReviews,
    validate: validateReview
  };
}

module.exports = ReviewController();