import { eliminar } from "../componentes/Aviso";
import { instancia } from "./api";

export const getDispositivosBusqueda = (data) => {
  return instancia
    .get("/getBusqueda", data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getProducto = (data) => {
  return instancia
    .get("/getProducto", data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const elimi = (data) => {
  return instancia
    .get("/setVisible", data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const verificar = () => {
  const productos = getDispositivosBusqueda("Redmi");
  console.log(productos);
  const producto = getProducto("HOT 10");
  console.log(producto);
  const e = elimi("HOT 10");
  console.log(e)
};
