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

router.put("/setVisible/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "update modelos_dispositivos_moviles set visible = 0 where id = ?";
  db.query(sql, [id], (error, results, fields) => {
    if (error) {
      console.error("Error al ejecutar");
    } else {
      console.log(results);
      console.log("eliminación exitosa");
    }
  });
});

router.get("/getProducto/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const sql = "call obtener_caracteristicas_modelo(?)";
  db.query(sql, [nombre], (error, results, fields) => {
    if (error) {
      res.send("Error al obtener dispositivo móvil.");
    } else {
      res.json({ producto: results });
    }
  });
});

router.get("/getBusqueda/:busqueda", (req, res) => {
  let p = req.params.busqueda;
  
  if(p==="&"){
    p = ""
  }
  console.log(p + "holis");
  const sql = "call buscar_modelo(?)";
  db.query(sql, [p], (error, results, fields) => {
    if (error) {
      res.json({ error : "Error al obtener dispositivo móvil."});
    } else {
      res.json({ dispositivos: results });
    }
  });
});


router.post("/setEtiqueta/:etiqueta", (req, res) => {
  const palabra = req.params.etiqueta;
  const sql = "insert into etiquetas (nombre, id_categoria) values (?, 1)";
  db.query(sql, [palabra], (error, results, fields) => {
    if (error) {
      res.send("Error al guardar etiqueta.");
    } else {
      res.send("Guardado correctamente.");
    }
  });
})
module.exports = router;
