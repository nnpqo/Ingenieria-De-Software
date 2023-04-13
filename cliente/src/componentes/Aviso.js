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
      {(close) => (
        <>
          <p className="mensaje">{props.mensaje}</p>
          <div className="botonesAviso">
            <Boton
              nombre={"Si"}
              estilos={"botonSi"}
              funcion={() => {
                borrar(close);
                close();
              }}
            />
            <Boton nombre={"No"} estilos={"botonNo"} funcion={close} />
          </div>
        </>
      )}
    </Popup>
  );
};

export const borrar = () => {
  document.getElementById("etiqueta").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("nombreModelo").value = "";
  document.getElementById("previsualizar").src =
    "http://localhost:3001/images/img.png";
};
