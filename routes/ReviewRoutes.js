const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");

router.post("/add", ReviewController.add);
router.delete("/delete/:id", ReviewController.delete);
router.get("/getValidated", ReviewController.getValidated);
router.get("/getUnvalidated", ReviewController.getUnvalidated);
router.post("/validate/:id", ReviewController.validate);
 
module.exports = router;
