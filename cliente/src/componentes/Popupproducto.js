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
              <div className="contenido-encabezado">
              {descripcion? <div className="boton-flecha" onClick={()=>(setDescripcion(false))}>
              <img className="icono-f" src={flechaderecha}></img>
                <p className="mostrar-pro">Mostrar productos</p>
              </div>:
              <div className="contenedor-izquierda" onClick={()=>(setDescripcion(true))}>
                <img className="icono-i" src={flechaizquierda}></img>
                </div>}
              
              <h1 className="nP">{props.nombre}</h1>
              <div className="contenedor-cruzanimado">
                <div class="close-container" onClick={() => close()}>
                  <div class="leftright"></div>
                  <div class="rightleft"></div>
                </div>
              </div>
            </div>
              {descripcion ? (
                <ContenidoDescripcion props={props}></ContenidoDescripcion>
              ) : (
                <ContenidoTabla></ContenidoTabla>
              )}
            </div>
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
    { imei: 15227, color: "rojo" },
    { imei: 15228, color: "verde" },
  ]) ;
  let contador = 0;
  const list= []
  lista.map((item) => {
      contador = contador + 1;
      list.push(<FilaProducto item={item} contador={contador}/>)
      
    
  });
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

          {list}
          
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
          }}> ✔ </button></td>
          <td><button className="vender-cancelar" onClick={()=>{setAñadir(false)}}>
          <img src={cruz}>
          </img> </button></td>
        </>:<></>}
        </tbody>
      </table>
    </div>
  );
};

const añadirProducto=(lista,setAñadir)=>{
  const imei=document.getElementById("añadirImei")
  const color=document.getElementById("añadirColor")
  lista.push({ imei: imei.value, color: color.value });
  setAñadir(false)
}

 const FilaProducto=(props)=>{
  const [modificar, setModificar]=useState(false);
  const [comprar, setComprar] = useState(false);

  return (<><tr id={props.item.imei} className="fila">
  <td className="ele">
    <p className="numero">{props.contador}</p>
  </td>
  <td className="ele">
    <input
      type="number"
      className="imei"
      id={props.item.imei+"imei"}
      placeholder={props.item.imei}
      disabled
    ></input>
  </td>
  <td className="ele">
    <input className="color pre" id={props.item.imei+"color"} placeholder={props.item.color} disabled></input>
  </td>
  {modificar?<>
    <td>
    <button className="vender-cancelar" onClick={()=>{aceptarCancelar(props.item,setModificar,true)}}> ✔ 
    </button></td>
    <td><button className="vender-cancelar" onClick={()=>{aceptarCancelar(props.item,setModificar,false)}}>
    <img src={cruz}>
    </img> </button></td></>:comprar?<></>:
    <>
    <td className="ele" ><button className="modificar-aceptar" onClick={()=>{modificarProducto(props.item,setModificar)
    }}>
    <img src={lapiz}>
    </img></button></td>
    <td className="ele"><button className="vender-cancelar">
    <img src={imgVender}>
    </img></button></td>
    </>}
</tr></>)
}
const modificarProducto=(producto,setModificar)=>{
  const imei=document.getElementById(producto.imei+"imei")
  const color=document.getElementById(producto.imei+"color")
  imei.disabled=false;
  imei.value=producto.imei;
  color.disabled=false;
  color.value=producto.color;
  setModificar(true);
}
const aceptarCancelar=(producto,setModificar,aceptar)=>{
  const imei=document.getElementById(producto.imei+"imei")
  const color=document.getElementById(producto.imei+"color")
  imei.disabled=true;
  color.disabled=true;
  setModificar(false)
  if(aceptar){
    producto.imei=imei.value;
    producto.color=color.value;
  }
  color.value="";
  imei.value="";
}
//  <Popup className="popup">

// </Popup>
