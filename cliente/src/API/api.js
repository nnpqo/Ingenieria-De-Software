import axios from "axios";

const instancia = axios.create({
  baseURL: "http://localhost:3001",
});

export const imagen = (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);
  instancia
    .post("/subirImagenes", formData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const setModeloDispositivo = () => {
  let nombre=document.getElementById("nombreModelo").value;
  let descripcion=document.getElementById("descripcion").value;
  let etiqueta=document.getElementById("etiqueta").value;
  const datos={nombre: nombre,
              descripcion: descripcion,
              etiqueta: etiqueta}
  console.log(datos);
  /*instancia
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
