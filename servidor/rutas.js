const { Router } = require("express");
const upload = require("./imagen");
const router = Router();
const db=require("./baseDeDatos")

//routes
router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.post("/setModelo", (req, res) => {
  const nombre =req.body.nombre;
  const rutaImg ="????";
  const descrip = req.body.descripcion;
  const etiqueta = req.body.etiqueta;
  db.query("call registrar_modelo(?,?,?)",[nombre,rutaImg,descrip],
  (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar consulta:', error);
    } else {
      console.log('Resultados de la consulta:', results);
    }
  })
  db.query("call relacion_etiqueta_modelo(?)",[etiqueta],
  (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar consulta:', error);
    } else {
      console.log('Resultados de la consulta:', results);
    }
  })
});

router.post("/subirImagenes", upload, (req, res) => {
  res.send("Archivo subido correctamente");
});

router.put("/actualizarModelo",(req,res) =>{
  const nombreAntiguio = req.body.modelo;
  const nombreNuevo = req.body.nombre;
  const descripcionNueva = req.body.descripcion;
  const etiquetaNueva = req.body.etiqueta;
  db.query("call modificar_modelo(?,?,?,?)",[nombreAntiguio,nombreNuevo,descripcionNueva,etiquetaNueva],
  (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar consulta:', error);
    } else {
      console.log('Resultados de la consulta:', results);
    }
  })
})

router.get("/getAllModeloDispositivo", (req, res) => {
  const etiqueta=req.body.etiqueta
  db.query("call obtener_etiquetas(?)",[etiqueta],
  (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar consulta:', error);
    } else {
      
      console.log('Resultados de la consulta:', results);
    }
  })
  res.send("Hello world!");
});
router.get("/getEtiquetas", (req, res) => {
  const categoria="dispositivos moviles"
  db.query("call obtener_etiquetas(?)",[categoria],
  (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar consulta:', error);
      res.status(500).json({ error: 'Error al obtener etiquetas' });
    } else {
      console.log('Resultados de la consulta:', results);
      res.json({ etiquetas: results[0] }); // Enviar etiquetas como respuesta
    }
  })
});

module.exports = router;
