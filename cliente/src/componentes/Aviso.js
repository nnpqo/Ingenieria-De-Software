import React from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';


export const Aviso = (props) => {
  return (
    <Popup trigger={<button  className={props.estilos} ><h2>{props.nombre}</h2></button>} modal
    nested>
      <p>{props.mensaje}</p>
      <Boton nombre={"si"} />
      <Boton nombre={"no"} />
    </Popup>
  );
};
