import { instancia } from "./api";

export const agregarEtiqueta = (dato) => {
  return instancia
    .post("/setEtiqueta/" + dato)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
