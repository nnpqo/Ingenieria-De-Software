import React from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/aviso.css";

export const Aviso = (props) => {
  return (
    <Popup
      trigger={
        <button className={props.estilos}>
          <h2>{props.nombre}</h2>
        </button>
      }
      modal
      nested
      className="aviso"
    >
      <p className="mensaje">{props.mensaje}</p>
      <div className="botonesAviso">
        <Boton nombre={"Si"} estilos={"botonSi"} />
        <Boton nombre={"No"} estilos={"botonNo"} />
      </div>
    </Popup>
  );
};
