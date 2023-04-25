import { instancia } from "./api";

export const agregarEtiqueta = (dato) => {
  return instancia
    .post("/setEtiquetas/" + dato)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
