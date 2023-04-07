import axios from "axios";

export const instancia = axios.create({
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
  let nombre = document.getElementById("nombreModelo").value;
  let descripcion = document.getElementById("descripcion").value;
  let etiqueta = document.getElementById("etiqueta").value;
  const datos = {
    nombre: nombre,
    descripcion: descripcion,
    etiqueta: etiqueta,
  };
  console.log(datos);
  instancia
    .post("/setModelo", datos)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
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
  instancia
    .put("/actualizarModelo", datos)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const getModeloDispositivos = async() => {
  return await instancia
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
