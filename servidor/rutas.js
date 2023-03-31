const { Router } = require("express");
const upload = require("./imagen")
const router = Router();


//routes
router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.post("/subirImagenes", upload, (req, res) => {
  res.send('Archivo subido correctamente');
});

module.exports = router;
