import React from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/aviso.css";
import { CajaTexto } from "./CajaTexto";

export const Aviso = (props) => {
  return (
    <Popup
      trigger={
        props.trigger ? (
          props.trigger
        ) : (
          <button className={props.estilos}>
            <h2>{props.nombre}</h2>
          </button>
        )
      }
      modal
      nested
      className="aviso"
    >
      
      {(close) => (
        <>
          {props.titulo && <h1 className="titulo">{props.titulo}</h1>}
          {props.mensaje && <p className="mensaje">{props.mensaje}</p>}

          {props.extra}
          <div className="botonesAviso">
            <Boton
              nombre={props.bt1Nombre}
              estilos={props.bt1Estilo}
              funcion={() => {
                {
                  props.bt1Funcion && props.bt1Funcion();
                }
                close();
              }}
            />
            {props.bt2Nombre && (
              <Boton
                nombre={props.bt2Nombre}
                estilos={props.bt2Estilo}
                funcion={close}
              />
            )}
          </div>
        </>
      )}
    </Popup>
  );
};

export const AvisoEti = (props) => {
  return (
    <Popup
      trigger={
        props.trigger ? (
          props.trigger
        ) : (
          <button className={props.estilos}>
            <h2>{props.nombre}</h2>
          </button>
        )
      }
      modal
      nested
      className="avisoEti"
    >
      {(close) => (
        <>
          {props.titulo && <h1 className="titulo">{props.titulo}</h1>}
          {props.mensaje && <p className="mensaje">{props.mensaje}</p>}

          <div className="cajita">
            <CajaTexto
              nombre={"Nombre de etiqueta*"}
              id2={"tex"}
              id={"etiquetaFormulario"}
              min={2}
              max={20}
              regex={"[ a-zA-Z0-9]+"}
            />
            <div className="botones-etiqueta">
              <Boton
                nombre={props.bt1Nombre}
                estilos={props.bt1Estilo}
                funcion={() => {
                  {
                    props.bt1Funcion && props.bt1Funcion();
                  }
                  close();
                }}
              />
              {props.bt2Nombre && (
                <Boton
                  nombre={props.bt2Nombre}
                  estilos={props.bt2Estilo}
                  funcion={close}
                />
              )}
            </div>
          </div>
        </>
      )}
    </Popup>
  );
};

export const borrar = () => {
  // document.getElementById("etiqueta").value = "Samsung";
  document.getElementById("descripcion").value = "";
  document.getElementById("nombreModelo").value = "";
  document.getElementById("image").value = "";
  document.getElementById("previsualizar").src =
    "http://localhost:3001/images/img.png";
};


/*<div className="botonesAviso">
            <Boton
              nombre={"Si"}
              estilos={"botonSi"}
              funcion={() => {
                {props.funcionSi()}
                close();
              }}
            />
            <Boton nombre={"No"} estilos={"botonNo"} funcion={close} />
          </div>*/
