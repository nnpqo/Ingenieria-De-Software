import React from "react";
import "../estilos/cajaTexto.css";

export const ComboBox = (props) => {
  const opciones = props.opciones.map((opciones) => (
    <option  key={opciones}>{opciones}</option>
  ));

  return (
    <div>
      <label className="letras">{props.nombre}</label>
      <select className="combo-box" id={props.id}>{opciones}</select>
    </div>
  );
};
