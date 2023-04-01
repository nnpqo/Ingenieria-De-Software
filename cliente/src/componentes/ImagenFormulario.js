import React from 'react';
import { Boton } from "./Boton";
//import "../estilos/imagenFormulario.css";
import "../estilos/imagenFormulario"
export const ImagenFormulario = () => {
  
  return <div className='imagen-formulario'>
    <img src="ruta-de-la-imagen.jpg" alt="Descripción de la imagen"/>
    {/*<input type={"file"} id="image" onChange={imagen}></input>*/}
    <Boton  nombre ={"subir del dispositivo"}/>
  </div>
};
