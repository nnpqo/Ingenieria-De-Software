import React, { useEffect } from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/aviso.css";
import { CajaTexto } from "./CajaTexto";
import { useState } from "react";
import { inputArtificial } from "./Ventana";

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
              regex={"^[a-zA-Z]+$"}
            />
            <div className="botones-etiqueta">
              <Mensaje3
                nombre="GUARDAR"
                estilos={"guardar"}
                funcion={() => {
                  props.bt1Funcion();
                  if (
                    document.getElementById("etiquetaFormulario").value === ""
                  ) {
                    inputArtificial();
                  }
                  if (!props.error) {
                    setTimeout(() => {
                      close();
                    }, 2000);
                  }
                }}
                mensaje={props.mensaje2}
                error={props.error}
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
  document.getElementById("precio").value = "";
  document.getElementById("previsualizar").src =
    process.env.REACT_APP_API_URL + "/images/img.png";
};
export const Mensaje = (props) => {
  return (
    <Popup
      trigger={
        <button className={props.estilos}>
          <h2>{props.nombre}</h2>
        </button>
      }
      modal
      hover="click"
      className="mensaje2"
    >
      {(close) => (
        <div className="mensaje-popup">
          {props.mensaje && <p className="mensaje">{props.mensaje}</p>}

          <div className="contenedor">
            <div className="loading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="124"
                height="124"
                viewBox="0 0 124 124"
              >
                <circle
                  class="circle-loading"
                  cx="62"
                  cy="62"
                  r="59"
                  fill="none"
                  stroke="hsl(271, 76%, 74%)"
                  stroke-width="6px"
                ></circle>
                <circle
                  className="circle"
                  cx="62"
                  cy="62"
                  r="59"
                  fill="none"
                  stroke="hsl(271, 76%, 53%)"
                  stroke-width="6px"
                  stroke-linecap="round"
                ></circle>
                <polyline
                  className="check"
                  points="73.56 48.63 57.88 72.69 49.38 62"
                  fill="none"
                  stroke="hsl(271, 76%, 53%)"
                  stroke-width="6px"
                  stroke-linecap="round"
                ></polyline>
              </svg>
            </div>
          </div>
          {
            <Boton
              nombre={props.bt1Nombre}
              estilos={props.bt1Estilo}
              funcion={() => {
                {
                  props.funcion && props.funcion();
                }
                close();
              }}
            />
          }
        </div>
      )}
    </Popup>
  );
};
export const Aviso2 = (props) => {
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
            <Mensaje
              nombre={props.bt1Nombre}
              mensaje={props.mensaje2}
              estilos={props.bt1Estilo}
              bt1Nombre={"OK"}
              bt1Estilo={"botonOk"}
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

export const Mensaje3 = (props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      setTimeout(closeModal, 2000);
    }
  }, [open]);
  const closeModal = () => setOpen(false);
  return (
    <div>
      <button
        type="button"
        className={props.estilos}
        onClick={() => {
          props.funcion();
          setOpen((o) => !o);
        }}
      >
        <h2>{props.nombre}</h2>
      </button>
      <Popup
        className={props.error ? "mensaje3E" : "mensaje3"}
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <div>
          <span className="mensaje">{props.mensaje}</span>
        </div>
      </Popup>
    </div>
  );
};
