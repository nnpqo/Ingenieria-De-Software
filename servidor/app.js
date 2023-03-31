const express = require("express");
const cors = require ("cors");
const app = express();
const port = 3001;

//rutas
app.use(cors());

app.use(require("./rutas"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

