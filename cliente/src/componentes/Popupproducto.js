import React, { useContext, useEffect, useState } from "react";
import { Boton } from "./Boton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../estilos/popupproducto.css";
import flechaderecha from "../imagenes/flecha-derecha.svg";
import flechaizquierda from "../imagenes/flecha-izquierda.svg";
import iconoAgregar from "../imagenes/iconoAgregar.svg";
import imgVender from "../imagenes/imgVender.svg";
import lapiz from "../imagenes/lapiz.svg";
import cruz from "../imagenes/cruz.svg";
import { agregarEtiqueta } from "../API/etiquetas";
import { agregarMovil, modificarMovil, obtenerMoviles } from "../API/productos";
import { mdiConsoleNetworkOutline } from "@mdi/js";
import { Context } from "../Context/Context"; 
import { Mensaje3 } from "./Aviso";

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
                {descripcion ? (
                  <div
                    className="boton-flecha"
                    onClick={() => setDescripcion(false)}
                  >
                    <img className="icono-f" src={flechaderecha}></img>
                    <p className="mostrar-pro">Mostrar productos</p>
                  </div>
                ) : (
                  <div
                    className="contenedor-izquierda"
                    onClick={() => setDescripcion(true)}
                  >
                    <img className="icono-i" src={flechaizquierda}></img>
                  </div>
                )}

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
                <ContenidoTabla
                  ruta={props.ruta} 
                  marca={props.etiqueta}  
                  precio={props.precio}
                  id_modelo={props.id_modelo}
                  nombre={props.nombre}
                ></ContenidoTabla>
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
const ContenidoTabla = ({ ruta,marca,precio,id_modelo, nombre }) => {
  const [aniadir, setAniadir] = useState(false);
  const [lista, setLista] = useState([]);
  const [men, setMensaje] = useState("");
  const [error, setError] = useState(false);

  let contador = 0;
  const list = [];
  if (lista) {
    lista?.map((item) => {
      contador = contador + 1;
      list.push(<FilaProducto modelo={nombre} ruta={ruta} marca={marca}  
        precio={precio} item={item} contador={contador} />);
    });
  }

  useEffect(() => {
    obtenerMoviles(nombre)
      .then((res) => {
        setLista(res.dispositivos[0]);
        console.log(lista);
      })
      .catch((err) => setLista([]));
  }, []);

  useEffect(() => {
    if (aniadir) {
      const tabla = document.getElementById("lista-tabla");
      tabla.scrollTop = tabla.scrollHeight;
    }
  }, [aniadir]);

  const aniadirProducto = () => {
    const imei = document.getElementById("aniadirImei").value;
    const color = document.getElementById("aniadirColor").value;
    const datos = { imei: imei, color: color, id_modelo: id_modelo };
    agregarMovil(datos).then((result) => {
      setMensaje(result.data.message);
      console.log(result)
      setError(result.data.error)
      if(!error){
        lista.push({ imei: imei, color: color, id_modelo: id_modelo });
      }}
      )
  }

  return (
    <div className="pp2">
      <button
        id="añadir-producto"
        className="bt-anadir"
        onClick={() => {
          setAniadir(true);
        }}
      >
        <div className="anadirp">
          {" "}
          <p className="a1">Añadir</p>
          <p className="a2">producto</p>
        </div>
        <div className="icono-agregar">
          <img className="IcoA" src={iconoAgregar}></img>
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

          {aniadir ? (
            <>
              <td className="ele">
                <div className="vacioEle"></div>
              </td>
              <td className="ele">
                <input type="number" className="imei" id="aniadirImei"></input>
              </td>
              <td className="ele">
                <input className="color pre" id="aniadirColor"></input>
              </td>
              <td>
              <Mensaje3
                   nombre=" ✔ "
                   estilos={"modificar-aceptar"}
                   funcion={() => {
                    console.log("hola");
                    aniadirProducto(); 
                  }}
                  mensaje={men}
                  error={error}
                  setAniadir={setAniadir}
                  aniadir={aniadir}
                />
              </td>
              <td>
                <button
                  className="cancelarPP"
                  onClick={() => {
                    setAniadir(false);
                  }}
                >
                  <img className="cruzmodcan" src={cruz}></img>{" "}
                </button>
              </td>
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

const FilaProducto = (props) => {
  const [modificar, setModificar] = useState(false);
  const [comprar, setComprar] = useState(false);
  const [datos, setDatos] = useState({});
  const {listaVenta} =useContext(Context)

  const modificarProducto = () => {
    const imei = document.getElementById(props.item.imei + "imei");
    const color = document.getElementById(props.item.imei + "color");
    imei.disabled = false;
    imei.value = props.item.imei;
    color.disabled = false;
    color.value = props.item.color;
    setModificar(true);
  };
  const aceptarCancelar = (aceptar) => {
    return new Promise((resolve, reject) => {
      const imei = document.getElementById(props.item.imei + "imei");
      const color = document.getElementById(props.item.imei + "color");
      console.log(imei);
      imei.disabled = true;
      color.disabled = true;
      setModificar(false);
      if (aceptar) {
        props.item.imei = imei.value;
        props.item.color = color.value;
      }
      color.value = "";
      imei.value = "";
      console.log(props.item);
      const result = {
        id: props.item.id,
        imei: props.item.imei,
        color: props.item.color,
      };

      resolve(result);
    });
  };
  const agregarALista=()=>{
    const producto={ruta:props.ruta ,modelo:props.modelo , precio:props.precio , marca:props.marca , 
      imei:props.item.imei , color:props.item.color, id:props.item.id}
      listaVenta.push(producto)
      setComprar(true)
    console.log(listaVenta)

  }
  return (
    <>
      <tr id={props.item.imei} className="fila">
        <td className="ele">
          <p className="numero">{props.contador}</p>
        </td>
        <td className={comprar? "eleComprado" : "ele"}>
          <input
            type="number"
            className="imei"
            id={props.item.imei + "imei"}
            placeholder={props.item.imei}
            disabled
          ></input>
        </td>
        <td className={comprar? "eleComprado" : "ele"}>
          <input
            className="color pre"
            id={props.item.imei + "color"}
            placeholder={props.item.color}
            disabled
          ></input>
        </td>
        {modificar ? (
          <>
            <td>
              <button
                className="modificar-aceptar"
                onClick={() => {
                  aceptarCancelar(true).then((res) => {
                    console.log(res);
                    modificarMovil(res);
                    setModificar(false);
                    document.getElementById(
                      props.item.imei + "imei"
                    ).disabled = false;
                    document.getElementById(
                      props.item.imei + "color"
                    ).disabled = false;
                  });
                }}
              >
                {" "}
                ✔
              </button>
            </td>
            <td>
              <button
                className="vender-cancelar"
                onClick={() => {
                  aceptarCancelar(false);
                }}
              >
                <img src={cruz}></img>{" "}
              </button>
            </td>
          </>
        ) : comprar ? (
          <></>
        ) : (
          <>
            <td className="ele">
              <button
                className="modificar-aceptar"
                onClick={() => {
                  modificarProducto();
                }}
              >
                <img src={lapiz}></img>
              </button>
            </td>
            <td className="ele">
              <button className="vender-cancelar" onClick={agregarALista}>
                <img src={imgVender}></img>
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

//  <Popup className="popup">

// </Popup>
