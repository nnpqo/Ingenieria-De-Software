const { Router } = require("express");
const upload = require("./imagen");
const router = Router();


//routes
router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.post("/subirImage", upload, (req, res) => {
  //codigo para guardar a la base de datos
});

module.exports = router;
