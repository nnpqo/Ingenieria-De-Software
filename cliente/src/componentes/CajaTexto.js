import React from "react";

function CajaTexto(props) {
  return (
    <div>
      <label>{props.nombre}</label>
      <input type="text" />
    </div>
  );
}

export default CajaTexto;
