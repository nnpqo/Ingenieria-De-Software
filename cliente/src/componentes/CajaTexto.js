import React from "react";
import "../estilos/cajaTexto.css";

export const CajaTexto = (props) => {
  return (
    <div className="cajaTexto">
      <label>{props.nombre}</label>
      <input id={props.id} type="text" />
    </div>
  );
}
