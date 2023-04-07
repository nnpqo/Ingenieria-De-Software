const express = require("express");
const cors = require ("cors");
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.json())
//rutas


app.use(require("./rutas"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

