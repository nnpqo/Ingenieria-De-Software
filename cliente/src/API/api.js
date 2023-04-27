import axios from "axios";
import { borrar } from "../componentes/Aviso";

export const instancia = axios.create({
  baseURL: "http://localhost:3001",
});

let file = "null";

export const guardarImagen = () => {
  if (file != "null") {
    console.log("si hay archivo");
    const formData = new FormData();
    formData.append("image", file);
    instancia
      .post("/subirImagenes", formData)
      .then((res) => console.log(res.data))
      .catch((err) => {
        alert("archivo no es imagen válida");
      });
  }
};

export const imagen = (event) => {
  const pesoMax = 1048576;
  const minAncho = 250;
  const minAlto = 250;
  const archivo = event.target.files[0];
  if (archivo !== undefined) {
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(archivo.type)) {
      alert("El archivo no es una imagen válida");
    } else {
      if (archivo.size > pesoMax) {
        console.log("tamaño de la imagen muy alta");
        alert("El tamaño de la imagen es superior a la permitida");
      } else {
        const img = new Image();
        img.src = URL.createObjectURL(archivo);
        img.onload = () => {
          console.log(img.width);
          console.log(img.height);
          if (img.width < minAlto || img.height < minAncho) {
            console.log("resolusion baja");
            alert("la resolucion de la imagen es menor a la permitida");
          } else {
            let miImagen = document.getElementById("previsualizar");
            miImagen.src = URL.createObjectURL(archivo);
          }
        };
        file = archivo;
      }
    }
  }
};

export const setModeloDispositivo = () => {
  let nombre = document.getElementById("nombreModelo").value;
  let descripcion = document.getElementById("descripcion").value;
  let etiqueta = document.getElementById("etiqueta").value;
  let imagen = document.getElementById("image").files;
  let precio = document.getElementById("precio").value;
  let rutaImg = imagen[0] ? "/images/" + imagen[0].name : "/images/img.png";
  const datos = {
    nombre: nombre,
    descripcion: descripcion,
    etiqueta: etiqueta,
    ruta: rutaImg,
    precio: precio,
  };
  console.log(datos);
  instancia
    .post("/setModelo", datos)
    .then((res) => {
      alert(res.data.message);
      if (!res.data.error) {
        borrar();
      }
    })
    .catch((err) => console.log(err));
};

export const updateModeloDispositivo = () => {
  let modelo = document.getElementById("modelo").value;
  let nombre = document.getElementById("nombreModelo").value;
  let descripcion = document.getElementById("descripcion").value;
  let etiqueta = document.getElementById("etiqueta").value;
  let imagen = document.getElementById("image").files;
  let precio = document.getElementById("precio").value;
  let rutaImg = imagen[0] ? "/images/" + imagen[0].name : "/images/img.png";
  const datos = {
    modelo: modelo,
    nombre: nombre,
    descripcion: descripcion,
    etiqueta: etiqueta,
    ruta: rutaImg,
    precio: precio,
  };
  console.log(datos);
  instancia
    .put("/actualizarModelo", datos)
    .then((res) => {
      console.log(res.data);
      alert(res.data.message);
      if (!res.data.error) {
        borrar();
      }
    })
    .catch((err) => console.log(err));
};

export const getModeloDispositivos = () => {
  return instancia
    .get("/getAllModeloDispositivo")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      alert(error);
    });
};

export const getEtiquetas = () => {
  return axios
    .get("http://localhost:3001/getEtiquetas")
    .then((res) => {
      const etiquetas = res.data.etiquetas;
      const nombres = etiquetas.map((etiqueta) => etiqueta.nombre);
      return nombres;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getNombreModeloDispositivos = () => {
  /*let e=eti
  console.log(e)*/
  return axios

    .get("http://localhost:3001/getAllModeloDispositivo")
    .then((res) => {
      const modelos = res.data.modelos.map((modelo) => modelo.nombre);
      console.log(modelos);
      return modelos;
    })
    .catch((error) => {
      console.log(error);
    });
};
