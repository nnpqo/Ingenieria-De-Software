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
  const precio = req.body.precio;
  let sql =
    "select * from modelos_dispositivos_moviles where visible = 0 and nombre = ?";
  db.query(sql, [nombre], (error, results, fields) => {
    if (error) throw error;
    if (results.length === 0) {
      console.log("No se encontraron resultados");
      db.query(
        "call registrar_modelo(?,?,?,?)",
        [nombre, rutaImg, descrip, precio],
        (error, results, fields) => {
          if (error) {
            if (error.code === "ER_DUP_ENTRY") {
              res.send({
                message: "Error al guardar: dispositivo móvil ya existe.",
                error: true,
              });
            } else {
              res.send({
                message: "Error al guardar",
                error: true,
              });
            }
          } else {
            db.query(
              "call relacion_etiqueta_modelo(?)",
              [etiqueta],
              (error, results, fields) => {
                if (error) {
                  console.error("Error al ejecutar consulta:", error.code);
                } else {
                  res.send({ message: "Guardado correctamente", error: false });
                }
              }
            );
          }
        }
      );
    } else {
      console.log(results);
      db.query(
        "call modificar_modelo(?,?,?,?,?,?)",
        [nombre, nombre, descrip, etiqueta, precio, rutaImg],

        (error, results, fields) => {
          if (error) {
            res.send({
              message: "Error al guardar",
              error: true,
            });
          } else {
            res.send({ message: "Guardado correctamente", error: false });
          }
        }
      );
      sql =
        "update modelos_dispositivos_moviles set visible = 1 where nombre = ?";
      db.query(sql, [nombre], (error, results, fields) => {
        if (error) {
          console.error("Error al ejecutar");
        } else {
          console.log(results);
          console.log("aaahh");
        }
      });
    }
  });
});

router.put("/actualizarModelo", (req, res) => {
  const nombreAntiguio = req.body.modelo;
  const nombreNuevo = req.body.nombre;
  const descripcionNueva = req.body.descripcion;
  const etiquetaNueva = req.body.etiqueta;
  const nuevaRuta = req.body.ruta;
  const precio = req.body.precio;
  if (nuevaRuta === "") {
    db.query(
      "call modificar_modelo_sin_imagen(?,?,?,?,?)",
      [nombreAntiguio, nombreNuevo, descripcionNueva, etiquetaNueva, precio],
      (error, results, fields) => {
        if (error) {
          console.error("error: " + error.message);
          if (error.code === "ER_DUP_ENTRY") {
            res.send({
              message: "Error al modificar: dispositivo móvil ya existe.",
              error: true,
            });
          } else {
            res.send({
              message: "Error al modificar",
              error: true,
            });
          }
        } else {
          res.send({ message: "Modificado correctamente", error: false });
        }
      }
    );
  } else {
    db.query(
      "call modificar_modelo(?,?,?,?,?,?)",
      [
        nombreAntiguio,
        nombreNuevo,
        descripcionNueva,
        etiquetaNueva,
        precio,
        nuevaRuta,
      ],

      (error, results, fields) => {
        if (error) {
          console.error("error: " + error.message);
          if (error.code === "ER_DUP_ENTRY") {
            res.send({
              message: "Error al modificar: dispositivo móvil ya existe.",
              error: true,
            });
          } else {
            res.send({
              message: "Error al modificar",
              error: true,
            });
          }
        } else {
          res.send({ message: "Modificado correctamente", error: false });
        }
      }
    );
  }
});

router.get("/getAllModeloDispositivo", (req, res) => {
  const consulta =
    "select distinct m.id, m.visible, m.nombre, m.ruta_imagen, m.descripcion, m.precio_venta_sugerido as precio, e.nombre as etiqueta from modelos_dispositivos_moviles m, etiqueta_modelo em, etiquetas e where m.id = em.id_modelo_dispositivo and em.id_etiqueta = e.id and e.id_categoria = 1 order by m.nombre asc ;";
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
      console.error("error : " + error.message);
      res.send({ mensaje: "Error al eliminar", error: true });
    } else {
      console.log(results);
      res.send({ mensaje: "Eliminación exitosa", error: false });
    }
  });
});

router.get("/getProducto/:nombre", (req, res) => {
  console.log(req.params.nombre);
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

  if (p === "&") {
    p = "";
  }
  const sql = "call buscar_modelo(?)";
  db.query(sql, [p], (error, results, fields) => {
    if (error) {
      res.json({ error: "Error al obtener dispositivo móvil." });
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
      if (error.code === "ER_DUP_ENTRY") {
        res.send({
          message: "Error al guardar: etiqueta ya existe.",
          error: true,
        });
      } else {
        res.send({ message: "Error al guardar etiqueta.", error: true });
      }
    } else {
      res.send({ message: "Guardado correctamente.", error: false });
    }
  });
});

router.post("/registrarProducto", (req, res) => {
  const imei = req.body.imei;
  const color = req.body.color;
  const id_modelo = req.body.id_modelo;
  const sql = "call registrar_producto(?,?,?)";
  db.query(sql, [imei, color, id_modelo], (error, results, fields) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        res.send({
          message: "Error al guardar: producto ya existe",
          error: true,
        });
      } else {
        res.send({ message: "Error al guardar producto.", error: true });
      }
    } else {
      res.send({ message: "Guardado correctamente.", error: false });
    }
  });
});

router.put("/modificarProducto", (req, res) => {
  const id = req.body.id;
  const imei = req.body.imei;
  const color = req.body.color;
  const sql = "call modificar_producto(?,?,?)";

  db.query(sql, [id, imei, color], (error, results, fields) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        res.send({
          message: "Error al modificar: producto ya existe.",
          error: true,
        });
      } else {
        res.send({ message: "Error al modificar producto.", error: true });
      }
    } else {
      res.send({ message: "Modificado correctamente.", error: false });
    }
  });
});

router.get("/getProductos/:modelo", (req, res) => {
  const modelo = req.params.modelo;
  const sql = "call obtener_producto(?)";
  db.query(sql, [modelo], (error, results, fields) => {
    if (error) {
      res.send({ message: "Error al obtener moviles.", error: true });
    } else {
      res.json({ dispositivos: results });
    }
  });
});

router.put("/ventas/:id", (req, res) => {
  const id = req.params.id;

  const sql = "update dispositivo_movil set vendido = 1 where id = ?";
  db.query(sql, [id], (error, results, fields) => {
    if (error) {
      res.send({ message: "Error al vender", error: true });
    } else {
      res.send({ messege: "Vendido correctamente", error: false });
    }
  });
});

router.get("/credenciales/:user/:pass", (req, res) => {
  const user = req.params.user;
  const pass = req.params.pass;
  const result = user === "kevin" && pass === "jdkcell123";
  console.log(result);
  res.send(result);
});

module.exports = router;
