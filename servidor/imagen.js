const sharp = require("sharp");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "/public/images/"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  dest: path.join(__dirname, "public/images/"),
}).single("image");


module.exports = upload;
