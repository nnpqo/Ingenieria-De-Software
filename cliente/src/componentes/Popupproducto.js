import React, { useState } from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/popupproducto.css";

export const Popupproducto = (props) => {
  const [descripcion,setDescripcion]=useState(true);
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
              {descripcion? <div onClick={()=>(setDescripcion(false))}>-D</div>:
              <div onClick={()=>(setDescripcion(true))}>C-</div>}
              
              <h1 className="nP">{props.nombre}</h1>
              <div class="close-container" onClick={()=>close()}>
                <div class="leftright"></div>
                <div class="rightleft"></div>
              </div>

            </div>
            {descripcion?  <ContenidoDescripcion props={props}></ContenidoDescripcion>:
              <ContenidoTabla></ContenidoTabla>
            }
           
          </div>
        </>
      )}
    </Popup>
  );
};

const ContenidoDescripcion=(prop)=>{
  const props=prop.props
  console.log(props)
  console.log(props.etiqueta)
  return <div className="popupcontenido">
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
}
const ContenidoTabla = ()=>{
  const [añadir,setAñadir]= useState(false)
  const lista=[{imei:15225,color:"blanco"},{imei:15225,color:"blanco"},{imei:15225,color:"blanco"}]
  let contador=0;
  let list= lista.map((item)=>{
    {contador=contador+1}
    return<div id={item.imei} className="fila">
      <div className="ele"><p className="numero">{contador}</p></div>
      <div className="ele"><input type="number" className="imei" value={item.imei} disabled></input></div>
      <div className="ele"><input className="color" value={item.color} disabled></input></div>
        <div className="modificar-vender ele">
          modificar vender
        </div>
        <div className="aceptar-cancelar ele">
          aceptar cancelar
        </div>
    </div>
  })
  console.log(lista)
  return <div className="pp2">
    <button id="añadir-producto" className="bt-anadir"onClick={()=>{}}>
      <p>añadir</p>
      <p>producto</p>
      <img src="../imagenes/iconoAgregar.svg"></img>
    </button>
    <div id="tabla" className="tabla">
      <div id="titulos">
        <h2>numero</h2>
        <h2>Imei</h2>
        <h2>color</h2>
        <h2>modificar</h2>
        <h2>vender</h2>
      </div>
      <div id="lista" className="lista">
        {list}
        {/*añadir? <>input</>*/}
      </div>
    </div>
  </div>
}
//  <Popup className="popup">

// </Popup>
