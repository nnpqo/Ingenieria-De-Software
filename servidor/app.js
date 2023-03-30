
const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  //res.send("Hello world!");
res.json({hola:"hola que hace"})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
