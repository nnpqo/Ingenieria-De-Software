const { Router } = require("express");
const upload = require("../imagen");
const router = Router();


//routes
router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.post("/upload", upload, (req, res) => {
  res.send("subido");
});

module.exports = router;
