import React from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/aviso.css";

const borrar = (close) => {
  document.getElementById("etiqueta").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("nombreModelo").value = "";
  document.getElementById("previsualizar").src =
    "http://localhost:3001/images/img.png";
  close();
};

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
      {(close) => (
        <>
          <p className="mensaje">{props.mensaje}</p>
          <div className="botonesAviso">
          <Boton nombre={"Si"} estilos={"botonSi"} funcion={() => borrar(close)} />
            <Boton nombre={"No"} estilos={"botonNo"} funcion={close} />
          </div>
        </>
      )}
    </Popup>
  );
};

