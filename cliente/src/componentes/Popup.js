import React from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";

export const Popup =(props)=>{
    return(
        <div className="popup">
            <div className="popupcontenido">
                <img src="ruta-de-la-imagen.jpg" alt="Descripción de la imagen" />
                    <div>
                        <h3>Marca</h3>
                        <p>{props.etiqueta}</p>
                        <h3>Modelo</h3>
                        <p>{props.nombre}</p>
                        <h3>Precio</h3>
                        
                    </div>
                    <div>
                        <h3>Caracteristicas</h3>
                        <p>{props.caracteristicas}</p>
                    </div>
                <Boton className="cerrar">
                </Boton>
            </div>
        </div>        
    );

};