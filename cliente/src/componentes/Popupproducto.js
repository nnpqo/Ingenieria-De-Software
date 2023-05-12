import React, { useState } from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/popupproducto.css";
import flechaderecha from "../imagenes/flecha-derecha.svg";
import flechaizquierda from "../imagenes/flecha-izquierda.svg";
export const Popupproducto = (props) => {
  const [descripcion, setDescripcion] = useState(true);
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
      className="pr"
    >
      {(close) => (
        <>
          <div className="popupproucto">
            <div className="content">
              {descripcion? <div className="boton-flecha" onClick={()=>(setDescripcion(false))}>
                <p className="mostrar-pro">Mostrar productos</p>
                <img className="icono-f" src={flechaderecha}></img>
              </div>:
              <div onClick={()=>(setDescripcion(true))}>
                <img className="icono-i" src={flechaizquierda}></img>
                </div>}
              
              <h1 className="nP">{props.nombre}</h1>
              <div class="close-container" onClick={() => close()}>
                <div class="leftright"></div>
                <div class="rightleft"></div>
              </div>
            </div>
            {descripcion ? (
              <ContenidoDescripcion props={props}></ContenidoDescripcion>
            ) : (
              <ContenidoTabla></ContenidoTabla>
            )}
          </div>
        </>
      )}
    </Popup>
  );
};

const ContenidoDescripcion = (prop) => {
  const props = prop.props;
  console.log(props);
  console.log(props.etiqueta);
  return (
    <div className="popupcontenido">
      <img
        className="imagenpop"
        src={props.ruta}
        alt="Descripción de la imagen"
      />
      <div className="med">
        <div className="centreado1">
          <h2>Marca</h2>
          <p className="marca">{props.etiqueta}</p>
        </div>

        <div className="centreado2">
          <h2>Precio</h2>
          <p>{props.precio} Bs</p>
          <h3 className="Bs"></h3>
        </div>
      </div>

      <div className="cate">
        <h2 className="titulo-caracteristicas">Descripción</h2>
        {<p className="descripcion">{props.caracteristicas}</p>}
      </div>
    </div>
  );
};
const ContenidoTabla = () => {
  const [añadir, setAñadir] = useState(false);
  const lista = [
    { imei: 15225, color: "blanco" },
    { imei: 15225, color: "blanco" },
    { imei: 15225, color: "blanco" },
  ];
  let contador = 0;
  let list = lista.map((item) => {
    {
      contador = contador + 1;
    }
    return (
      <tr id={item.imei} className="fila">
        <td className="ele">
          <p className="numero">{contador}</p>
        </td>
        <td className="ele">
          <input
            type="number"
            className="imei"
            value={item.imei}
            disabled
          ></input>
        </td>
        <td className="ele">
          <input className="color pre" value={item.color} disabled></input>
        </td>
        <td className="modificar-vender ele">modificar vender</td>
        <td className="aceptar-cancelar ele">aceptar cancelar</td>
      </tr>
    );
  });
  console.log(lista);
  return (
    <div className="pp2">
      <button id="añadir-producto" className="bt-anadir" onClick={() => {}}>
        <div className="anadirp">
          {" "}
          <p className="a1">añadir</p>
          <p className="a2">producto</p>
        </div>
        <div className="icono-agregar">
          <img src="../imagenes/iconoAgregar.svg"></img>
        </div>
      </button>
      <table id="tabla" className="tabla">
        <thead id="titulos">
          <th className="o">Num.</th>
          <th className="m1">IMEI</th>
          <th className="m2">Color</th>
          <th className="m3">Modificar</th>
          <th className="n">Vender</th>
        </thead>
        <tbody>
          {list}
          {/*añadir? <>input</>*/}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};
//  <Popup className="popup">

// </Popup>
