
const express = require("express");
const cors = require ("cors");
const app = express();
const port = 3001;

app.use (cors());
app.get("/", (req, res) => {
  console.log("hi");
res.send({hola:"hola que hace"})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
