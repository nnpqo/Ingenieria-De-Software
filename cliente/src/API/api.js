import axios from "axios";
const url = "http://localhost:3001";

export const imagen = (file) => {
  axios
    .post(url + "", file)
    .then()
    .catch();
};

export const setModeloDispositivo = () => {
  let nombre=document.getElementById("nombreModelo").value;
  let descripcion=document.getElementById("descripcion").value;
  let etiqueta=document.getElementById("etiqueta").value;
  const datos={nombre: nombre,
              descripcion: descripcion,
              etiqueta: etiqueta}
  console.log(datos);
  /*axios
    .post(url + "", datos)
    .then()
    .catch();*/
};
export const updateModeloDispositivo = () => {
  let modelo=document.getElementById("modelo").value;
  let nombre=document.getElementById("nombreModelo").value;
  let descripcion=document.getElementById("descripcion").value;
  let etiqueta=document.getElementById("etiqueta").value;
  const datos={modelo: modelo,
              nombre: nombre,
              descripcion: descripcion,
              etiqueta: etiqueta}
  console.log(datos);
  /*axios
    .post(url + "", datos)
    .then()
    .catch();*/
};
export const getModeloDispositivos = () => {
  axios
    .get(url + "")
    .then(function (response) {
      console.log(response.data.hola);
    })
    .catch(function (error) {
      console.log(error);
    });
};
