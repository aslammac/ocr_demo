const express = require("express");
const ocrController = require("../controllers/ocr.js");
const fileUpload = require("../middlewares/upload.js");
const router = express.Router();

router.get("/", (req, res, next) => {
  var err = new Error("An error occurred");
  err.statusCode = 404;
  err.data = "URL not found";
  next(err);
});

router.post("/", fileUpload.single("file"), ocrController.getImage);

module.exports = router;
