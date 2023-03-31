const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "/public/imagenes"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  dest: path.join(__dirname, "public/imagenes"),
}).single("image");

module.exports = upload;
