import React from "react";
import "../estilos/producto.css";
import samsung from "../imagenes/samsung_g.jpg";

export const Producto = (props) => {
  const ruta="http://localhost:3001" + props.ruta
  console.log(ruta)
  return (
    <div className="pantalla">
      <div className="san">
        <img className="product" src={ruta}  />
        <h4 className="tittle">{props.etiqueta}</h4>
        <h4 className="tittle">{props.nombre}</h4>
      </div>
    </div>
  );
};
