const express = require("express");
const cors = require ("cors");
const app = express();
const port = 3001;

<<<<<<< HEAD

//rutas
app.use(require("./rutas"));
=======
app.use (cors());
app.get("/", (req, res) => {
  console.log("hi");
res.send({hola:"hola que hace"})
});
>>>>>>> main

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
