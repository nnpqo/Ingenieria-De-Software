import React, { useEffect, useState } from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/popupproducto.css";
import flechaderecha from "../imagenes/flecha-derecha.svg";
import flechaizquierda from "../imagenes/flecha-izquierda.svg";
import iconoAgregar from "../imagenes/iconoAgregar.svg"
import imgVender from "../imagenes/imgVender.svg"
import lapiz from "../imagenes/lapiz.svg"
import cruz from  "../imagenes/cruz.svg"
import { agregarEtiqueta } from "../API/etiquetas";
import { FilaProducto } from "./FilaProducto";

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
  const [lista,setLista] = useState([
    { imei: 15225, color: "blanco" },
    { imei: 15225, color: "blanco" },
    { imei: 15225, color: "blanco" },
  ]) ;
  let contador = 0;
  const list=[<FilaProducto item={{ imei: 15225, color: "blanco" }}></FilaProducto>,<FilaProducto ></FilaProducto>];
  /*lista.map((item) => {
      {contador = contador + 1;}
      list.push(<FilaProducto item={item} contador={contador}/>)
    
  });*/
  console.log(list)
  useEffect(()=>{
    if(añadir){
      const tabla=document.getElementById("lista-tabla")
      tabla.scrollTop= tabla.scrollHeight
    }
  },[añadir])
  return (
    <div className="pp2">
      <button id="añadir-producto" className="bt-anadir" onClick={() => {setAñadir(true)
      }}>
        <div className="anadirp">
          {" "}
          <p className="a1">Añadir</p>
          <p className="a2">producto</p>
        </div>
        <div className="icono-agregar">
          <img src={iconoAgregar}></img>
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
        <tbody id="lista-tabla">
          {lista.map((item) => {
            {console.log(item)}
          return 
          <FilaProducto item={item} contador={1}/>
          })}
          
          {añadir? <>
          <td className="ele" ></td>
          <td className="ele">
          <input
            type="number"
            className="imei"
            id="añadirImei" 
          ></input>
        </td>
        <td className="ele">
          <input className="color pre" id="añadirColor"></input>
        </td>
        <td>
          <button className="vender-cancelar" onClick={()=>{añadirProducto(lista,setAñadir)
          setAñadir(false)
          }}> ✔ </button></td>
          <td><button className="vender-cancelar">
          <img src={cruz}>
          </img> </button></td>
        </>:<></>}
        </tbody>
      </table>
    </div>
  );
};

const añadirProducto=(lista)=>{
  const imei=document.getElementById("añadirImei")
  const color=document.getElementById("añadirColor")
  lista.push({ imei: imei.value, color: color.value }); 
}

//  <Popup className="popup">

// </Popup>
