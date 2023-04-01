import React from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";

export const Aviso = (props) => {
  return (
    <div className="aviso">
      <p>{props.mensaje}</p>
      <Boton nombre={"si"} />
      <Boton nombre={"no"} />
    </div>
  );
};
