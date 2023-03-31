import React from 'react';
import { Boton } from "./Boton";
import Popup from 'reactjs-popup';
export const CuadroModelo = (props) => {
  return <div className='cuadro-modelo'>
    <img src="ruta-de-la-imagen.jpg" alt="Descripción de la imagen"/>
    <p>{props.etiqueta}</p>
    <p>{props.nombre}</p>
  </div>
};
