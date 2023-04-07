import React from "react";
import "../estilos/producto.css";
import samsung from "../imagenes/samsung_g.jpg";

export const Producto = (props) => {
  return (
    <div className="pantalla">
      <div className="san">
        <img className="product" src={props.img} />
        <h4 className="tittle">{props.etiqueta}</h4>
        <h4 className="tittle">{props.nombre}</h4>
      </div>
    </div>
  );
};
