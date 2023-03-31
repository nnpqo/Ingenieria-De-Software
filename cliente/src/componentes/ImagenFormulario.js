import React from 'react';
import { Boton } from "./Boton";
export const ImagenFormulario = () => {
  return <div className='imagen-formulario'>
    <img src="ruta-de-la-imagen.jpg" alt="Descripción de la imagen"/>
    <Boton  nombre ={"subir del dispositivo"}/>
  </div>
};