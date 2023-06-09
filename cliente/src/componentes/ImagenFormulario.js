import React, { useEffect, useState } from "react";
import { Boton } from "./Boton";
import { imagen } from "../API/api";
import imagenCarga from "../img.png";
import "../estilos/imagenFormulario.css";

export const ImagenFormulario = () => {
  return (
    <div className="imagen">
    <div className="imagen-formulario">
      <label htmlFor="image" className="custom-file-upload">
        <img
          src={process.env.REACT_APP_API_URL+"/images/img.png"}
          alt="Icono de carga de archivos"
          className="posicion"
          id="previsualizar"
        />
        <h4 className="posicion2">Subir imagen</h4>
      </label>
      <input
        type="file"
        id="image"
        onChange={(e) => {imagen(e)}}
        style={{ display: "none" }}
        accept="image/png, image/jpeg"
      />
    </div>
  </div>
  );
};
