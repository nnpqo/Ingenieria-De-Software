const { Router } = require("express");
const upload = require("./imagen");
const router = Router();
const db = require("./baseDeDatos");

//routes
router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.post("/subirImagenes", upload, (req, res) => {
  res.send("Archivo subido correctamente");
});

router.post("/setModelo", (req, res) => {
  const nombre = req.body.nombre;
  const rutaImg = req.body.ruta;
  const descrip = req.body.descripcion;
  const etiqueta = req.body.etiqueta;
  db.query(
    "call registrar_modelo(?,?,?)",
    [nombre, rutaImg, descrip],
    (error, results, fields) => {
      if (error) {
        res.send({
          message: "Error al guardar: " + error.message,
          error: true,
        });
      } else {
        db.query(
          "call relacion_etiqueta_modelo(?)",
          [etiqueta],
          (error, results, fields) => {
            if (error) {
              console.error("Error al ejecutar consulta:", error.message);
            } else {
              res.send({ message: "Guardado correctamente", error: false });
            }
          }
        );
      }
    }
  );
});

router.put("/actualizarModelo", (req, res) => {
  const nombreAntiguio = req.body.modelo;
  const nombreNuevo = req.body.nombre;
  const descripcionNueva = req.body.descripcion;
  const etiquetaNueva = req.body.etiqueta;
  const nuevaRuta = req.body.ruta;

  db.query(
    "call modificar_modelo(?,?,?,?,?)",
    [nombreAntiguio, nombreNuevo, descripcionNueva, etiquetaNueva, nuevaRuta],

    (error, results, fields) => {
      if (error) {
        res.send({
          message: "Error al actualizar : " + error.message,
          error: true,
        });
      } else {
        res.send({ message: "Modificado correctamente", error: false });
      }
    }
  );
});

router.get("/getAllModeloDispositivo", (req, res) => {
  const consulta =
    "select distinct m.id, m.visible, m.nombre, m.ruta_imagen, e.nombre as etiqueta from modelos_dispositivos_moviles m, etiqueta_modelo em, etiquetas e where m.id = em.id_modelo_dispositivo and em.id_etiqueta = e.id and e.id_categoria = 1 order by m.nombre asc ;";
  db.query(consulta, (error, results, fields) => {
    if (error) {
      console.error("Error al ejecutar consulta:", error);
      res.status(500).json({ error: "Error al obtener modelos" });
    } else {
      console.log("Resultados de la consulta:", results);
      res.json({ modelos: results });
    }
  });
});

router.get("/getEtiquetas", (req, res) => {
  const categoria = "dispositivos moviles";
  db.query(
    "call obtener_etiquetas(?)",
    [categoria],
    (error, results, fields) => {
      if (error) {
        console.error("Error al ejecutar consulta:", error);
        res.status(500).json({ error: "Error al obtener etiquetas" });
      } else {
        console.log("Resultados de la consulta:", results);
        res.json({ etiquetas: results[0] }); // Enviar etiquetas como respuesta
      }
    }
  );
});

router.post("/setVisible", (req, res) => {
  const id = req.body.id; 
  const sql = "update into modelos_dispositivos_moviles set visible = 0 where id = ?"
  db.query(sql, [id], (error, results, fields)=>{
    if(error){
      console.error("Error al ejecutar")
    }else{
      console.log("eliminación exitosa")
    }
  })

})

router.get("/getProducto", (req, res) => {
  const id = req.body.id;
  const sql = ""
  db.query(sql,[id], (error, results, fields)=>{
    if(error){
      res.send("Error al obtener dispositivo móvil.")
    }else{
      res.json({producto: results})
    }
  })
})

router.get("/getBusqueda", (req, res) => {
  const palabra = req.body.id; 
  const sql = "select distinct m.id, m.visible, m.nombre, m.ruta_imagen, e.nombre as etiqueta from modelos_dispositivos_moviles m, etiqueta_modelo em, etiquetas e where m.id = em.id_modelo_dispositivo and em.id_etiqueta = e.id and e.id_categoria = 1 and m.nombre like '%?%' order by m.nombre asc ;"
  db.query(sql, [palabra], (error, result, fields) => {
    if(error){
      res.send("Error al obtener dispositivo móvil.")
    }else{
      res.json({dispositivos: results})
    }
  })
})

module.exports = router;
