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
  dest: path.join(__dirname, "public/images"),
  fileFilter: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Solo se permiten archivos PNG y JPG'));
    }
    cb(null, true);
  }
}).single("image");


module.exports = upload;
