import React from "react";
import "../estilos/cajaTexto.css";

const CajaTexto = (props) => {
  return (
    <div className="cajaTexto">
      <label>{props.nombre}</label>
      <input type="text" />
    </div>
  );
}

export default CajaTexto;
