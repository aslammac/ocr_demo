// const multer = require("multer");
const tesseract = require("node-tesseract-ocr");
const fs = require("fs");

exports.getImage = async (req, res, next) => {
  const img = "https://tesseract.projectnaptha.com/img/eng_bw.png";
  var fileName = req.file.filename;
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
    // load_system_dawg: 0,
    // tessedit_char_whitelist: "0123456789",
  };
  const textData = await tesseract
    .recognize("./uploads/" + fileName, config)
    .then((text) => {
      console.log(text);
      return text;
    })
    .catch((error) => {
      console.log(error.message);
    });
  fs.unlink("./uploads/" + fileName, (err) => console.error(err));
  res.status(201).json({
    status: "success",
    message: textData,
    fileName: fileName,
  });
};
