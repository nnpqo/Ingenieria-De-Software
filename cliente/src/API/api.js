import axios from "axios";
const instancia = axios.create({
  baseURL: "http://localhost:3001",
});


let file = null;


export const guardarImagen = () => {
  const archivo = file;
  if (!archivo == null) {
    const formData = new FormData();
    formData.append("image", file);
    instancia
      .post("/subirImagenes", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
};

export const imagen = (event) => {
  file = null;
  const pesoMax = 1048576;
  const minAncho = 250;
  const minAlto = 250;
  const archivo = event.target.files[0];
  if (!archivo.type.startsWith("image/")) {
    console.log("no es imagen");
    alert( "el archivo no es una imagen");
  } else {
    if (archivo.size > pesoMax) {
      console.log("tamaño de la imagen muy alta");
      alert("el tamaño de la imagen es superior a la permitida");
    } else {
      const img = new Image();
      
      img.src = URL.createObjectURL(archivo);
      img.onload = () => {
        console.log(img.width);
        console.log(img.height);
        if (img.width < minAlto || img.height < minAncho) {
           console.log("resolusion baja")
           alert( "la resolucion de la imagen es menor a la permitida");
        } else {
          let miImagen = document.getElementById("previsualizar");
          miImagen.src = URL.createObjectURL(archivo);
        }
      };
      file = archivo; 
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
