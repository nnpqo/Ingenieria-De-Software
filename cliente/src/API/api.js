import axios from "axios";
const instancia = axios.create({
  baseURL: "http://localhost:3001",
});

export const imagen = (event) => {
  const pesoMax = 1048576;
  const minAncho = 250;
  const minAlto = 250;
  const file = event.target.files[0];
  if (!file.type.startsWith("image/")) {
    console.log("hello")
    return "el archivo no es una imagen";
    
  } else {
    if (file.size > pesoMax) {
      console.log("hhhhhh")
      return "el tamaño de la imagen es superior a la permitida";
    } else {
      const img = new Image();
      img.onload = () => {
        console.log(img.width);
        console.log(img.height);
        if (img.width < minAlto || img.height < minAncho) {
          return "la resolucion de la imagen es menor a la permitida";
  
        }
        const formData = new FormData();
        formData.append("image", file);
        instancia
          .post("/subirImagenes", formData)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      };
        
    }
  }
};

export const setModeloDispositivo = () => {
  let nombre = document.getElementById("nombreModelo").value;
  let descripcion = document.getElementById("descripcion").value;
  let etiqueta = document.getElementById("etiqueta").value;
  const datos = {
    nombre: nombre,
    descripcion: descripcion,
    etiqueta: etiqueta,
  };
  console.log(datos);
  /*instancia
    .post(url + "", datos)
    .then()
    .catch();*/
};

export const updateModeloDispositivo = () => {
  let modelo = document.getElementById("modelo").value;
  let nombre = document.getElementById("nombreModelo").value;
  let descripcion = document.getElementById("descripcion").value;
  let etiqueta = document.getElementById("etiqueta").value;
  const datos = {
    modelo: modelo,
    nombre: nombre,
    descripcion: descripcion,
    etiqueta: etiqueta,
  };
  console.log(datos);
  /*instancia
    .post(url + "", datos)
    .then()
    .catch();*/
};
export const getModeloDispositivos = () => {
  instancia
    .get("/")
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
