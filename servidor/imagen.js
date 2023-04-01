const sharp = require("sharp");
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
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb("El archivo no es una imagen");
    }
    cb(null, true)},
}).single("image");



module.exports = upload;
