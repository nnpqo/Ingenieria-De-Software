const { Router } = require("express");
const upload = require("./imagen");
const router = Router();
const db=require("./baseDeDatos")
let file="null";

//routes
router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.post("/setModelo", (req, res) => {
  
  const imageName=file.filename;
  const nombre =req.body.nombre;
  const rutaImg ="/images/"+imageName;
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
  file="null";
});

router.post("/subirImagenes", upload, (req, res) => {
  file=req.file;
  res.send("Archivo subido correctamente");
});

router.put("/actualizarModelo",(req,res) =>{
  const nombreAntiguio = req.body.modelo;
  const nombreNuevo = req.body.nombre;
  const descripcionNueva = req.body.descripcion;
  const etiquetaNueva = req.body.etiqueta;
  const imageName=file.filename;
  const nuevaRuta="/images/"+imageName;
  
  db.query("call modificar_modelo(?,?,?,?,?)",[nombreAntiguio,nombreNuevo,descripcionNueva,etiquetaNueva,nuevaRuta],
  
  (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar consulta:', error);
    } else {
      console.log('Resultados de la consulta:', results);
    }
  })
  file="null"
})

router.get("/getAllModeloDispositivo", (req, res) => {
  const etiqueta = req.query.etiqueta;
  console.log(etiqueta)
  db.query("SELECT modelos_dispositivos_moviles.nombre, modelos_dispositivos_moviles.ruta_imagen, modelos_dispositivos_moviles.descripcion, etiquetas.nombre AS etiqueta FROM modelos_dispositivos_moviles JOIN etiqueta_modelo ON modelos_dispositivos_moviles.id = etiqueta_modelo.id_modelo_dispositivo JOIN etiquetas ON etiqueta_modelo.id_etiqueta = etiquetas.id",
  (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar consulta:', error);
      res.status(500).json({ error: 'Error al obtener modelos' });
    } else {
      console.log('Resultados de la consulta:', results);
      res.json({ modelos: results }); // Enviar modelos como respuesta
    }
  })
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
