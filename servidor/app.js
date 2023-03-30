const express = require("express");
const app = express();
const port = 3001;


//rutas
app.use(require("./rutas"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
