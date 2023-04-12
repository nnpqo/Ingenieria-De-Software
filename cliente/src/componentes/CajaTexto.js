import React from "react";
import "../estilos/cajaTexto.css";

export const CajaTexto = (props) => {
  return (
    <div className="cajaTexto">
      <label className="letras">{props.nombre}</label>
      <input id={props.id} type="text" pattern={props.regex} maxLength={props.max} minLength={props.min} required/>
    </div>
  );
};

export const TextArea = (props) => {
  return (
    <div className="textarea">
      <label className="letras">{props.nombre}</label>
      <textarea id={props.id} type="text" pattern={props.regex} maxLength={props.max} minLength={props.min} rows="3" cols="50" required/>
    </div>
  );
}
