import React from "react";
import { Boton } from "./Boton";
import { imagen } from "../API/api";
import imagenCarga from "../img.png";
import "../estilos/imagenFormulario.css";

export const ImagenFormulario = () => {
  return (
    <div className="imagen-formulario">
      <label for="image" class="custom-file-upload">
        <img
          src={imagenCarga}
          alt="Icono de carga de archivos"
          className="posicion"
        />
        <h4 className="posicion2">Subir imagen</h4>
      </label>
      <input
        type="file"
        id="image"
        onChange={imagen}
        style={{ display: "none" }}
      />
    </div>
  );
};
