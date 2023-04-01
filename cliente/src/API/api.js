import axios from "axios";
const url = "http://localhost:3001";

export const imagen = (file) => {
  axios
    .post(url + "", file)
    .then()
    .catch();
};

export const setModeloDispositivo = (datos) => {
  axios
    .post(url + "", datos)
    .then()
    .catch();
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
