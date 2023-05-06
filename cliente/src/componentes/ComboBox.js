import React, { useState } from "react";
import "../estilos/cajaTexto.css";
import { getProducto } from "../API/productos";

export const ComboBox = (props) => {
  

  const opciones = props.opciones
    ? props.opciones.map((opcion) => <option key={opcion}>{opcion}</option>)
    : null;

  return (
    <div>
      <label className="letras">{props.nombre}</label>
      <select
        className="combo-box"
        id={props.id}
        onChange={props.recuperar}
        onClick={props.click}
      >
        {props.vacio}
        {opciones}
      </select>
    </div>
  );
};
