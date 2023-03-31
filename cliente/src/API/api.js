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

export const setModeloDispositivo = (datos) => {
  instancia.post("", datos).then().catch();
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
