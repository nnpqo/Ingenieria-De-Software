import React from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/popupproducto.css";

export const Popupproducto = (props) => {
  return (
    <Popup
      trigger={
        props.trigger ? props.trigger
        : (
          <button className={props.estilos}>
            <h2>{props.nombre}</h2>
          </button> 
        )
      }
      modal
      nested
      className="pr"
    >
      {(close) => (
        <>
        <div className="popupproucto">
          <h2 className="nP">{props.nombre}</h2>
          <div className="popupcontenido">
            <img
              className="imagenpop"
              src={props.ruta}
              alt="Descripción de la imagen"
            />
            <div className="med">
              <div className="centreado1">

              <h3>Marca</h3>
              <p>{props.etiqueta}</p>
              </div>

              
              <div className="centreado2">
                <h3>Precio</h3>
                <p>{props.precio}</p>
              </div>
            </div>

            <div className="cate">
              <h3>Caracteristicas</h3>
              {/* <p>{props.caracteristicas}</p> */}
            </div>
            


          </div>
        </div>
        </>
      )}
    </Popup>
  );
};
//  <Popup className="popup">

// </Popup>
