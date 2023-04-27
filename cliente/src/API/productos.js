import { instancia } from "./api";

export const getDispositivosBusqueda = (data) => {
  return instancia
    .get("/getBusqueda/"+ data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getProducto = (data) => {
  return instancia
    .get("/getProducto"+ data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const eliminarProducto = (data) => {
  return instancia
    .put("/setVisible/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};


