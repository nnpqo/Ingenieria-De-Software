import React, { useEffect, useState } from "react";
import { Boton } from "./Boton";
import { imagen, validacion } from "../API/api";
import imagenCarga from "../img.png";

export const ImagenFormulario = () => {
  const [val, setValidacion] = useState(validacion);

  return (
    <div className="imagen-formulario">
      <label for="image" class="custom-file-upload">
        <img
          src={imagenCarga}
          alt="Icono de carga de archivos"
          id="previsualizar"
        />
        <span>Subir imagen</span>
      </label>
      <input
        type="file"
        id="image"
        onChange={(e) => {
          imagen(e);
          setValidacion(validacion);
        }}
        style={{ display: "none" }}
      />
      <span>{val}</span>
    </div>
  );
};
