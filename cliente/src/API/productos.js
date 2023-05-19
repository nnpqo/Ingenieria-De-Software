import { instancia } from "./api";

export const getDispositivosBusqueda = (data) => {
  return instancia
    .get("/getBusqueda/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getProducto = (data) => {
  return instancia
    .get("/getProducto/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const eliminarProducto = (data) => {
  console.log(data);
  return instancia
    .put("/setVisible/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const obtenerMoviles = (data) => {
  return instancia
    .get("/getProductos/" + data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const modificarMovil = (data) => {
  return instancia
    .put("/modificarProducto", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const agregarMovil = (data) => {
  return instancia
    .post("/registrarProducto", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const vender = (id) => {
  return instancia
    .put("/ventas/" + id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
