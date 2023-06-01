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
import { Mensaje3, Aviso } from "./Aviso";
import openDatabase, {
  agregarElemento,
  eliminarElemento,
  actualizarElemento,
  getElementos,
} from "../API/IndexDB";

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

const limitarDigitos = (input, limiteDigitos) => {
  const maxLength = limiteDigitos;
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
};
const ContenidoTabla = ({ ruta, marca, precio, id_modelo, nombre }) => {
  const [aniadir, setAniadir] = useState(false);
  const [lista, setLista] = useState([]);
  const [errorImei, setErrorImei] = useState(false); // Estado para controlar el mensaje de error

  const [color, setColor] = useState("");
  const [errorColor, setErrorColor] = useState(false);

  const [men, setMensaje] = useState("");
  const [error, setError] = useState(false);

  const { listaVenta, setListaVenta } = useContext(Context);

  let contador = 0;
  const list = [];
  if (lista) {
    lista?.map((item) => {
      let vendido = false;
      listaVenta?.map((item2) => {
        if (item.imei === item2.imei) {
          vendido = true;
        }
      });
      contador = contador + 1;
      list.push(
        <FilaProducto
          modelo={nombre}
          ruta={ruta}
          marca={marca}
          precio={precio}
          item={item}
          contador={contador}
          vendido={vendido}
        />
      );
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
    console.log(color.length, imei.length);
    const validar = color.length < 3 || color.length > 15;
    console.log(imei.length !== 15 || validar);
    if (imei.length !== 15 || validar) {
      setError(true);
      setMensaje("error al guardar");
      setErrorImei(true);
      setErrorColor(true);
    } else {
      setErrorImei(false);
      setErrorColor(false);
      const datos = { imei: imei, color: color, id_modelo: id_modelo };
      agregarMovil(datos).then((result) => {
        setMensaje(result.data.message);
        console.log(result);
        setError(result.data.error);
        if (!result.data.error) {
          lista.push({ imei: imei, color: color, id_modelo: id_modelo });
        }
      });
    }
  };

  const handleImeiChange = (event) => {
    const imei = event.target.value;
    if (imei.length !== 15) {
      setErrorImei(true); // Mostrar mensaje de error si el IMEI no tiene 15 dígitos
    } else {
      setErrorImei(false); // Limpiar el mensaje de error si el IMEI tiene 15 dígitos
    }
  };
  const handleColorChange = (event) => {
    const inputValue = event.target.value;
    const validCharacters = /^[A-Za-z\s]+$/;
    const isValidLength = inputValue.length >= 3 && inputValue.length <= 15;

    if (isValidLength) {
      if (validCharacters.test(inputValue)) {
        setColor(inputValue);
        setErrorColor("");
      } else {
        setColor(inputValue);
        setErrorColor("El color solo debe contener letras.");
      }
    } else {
      setColor(inputValue);
      setErrorColor("El color debe tener entre 3 y 15 caracteres.");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "e" || event.key === "+" || event.key === "-") {
      event.preventDefault();
      console.log("entramos?");
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    const cleanedText = pastedText.replace(/[e+]/gi, ""); // Eliminar 'e' y '+'
    document.execCommand("insertText", false, cleanedText);
  };
  
  return (
    <div className="pp2">
      <button
        id="añadir-producto"
        className="bt-anadir"
        onClick={() => {
          setAniadir(true);
          setErrorImei(false);
          setErrorColor(false);
        }}
      >
        <div className="anadirp">
          {" "}
          <div className="palabras">
            <p className="a1">Añadir</p>
            <p className="a2">producto</p>
          </div>
          <div className="icono-agregar">
            <img className="IcoA" src={iconoAgregar}></img>
          </div>
        </div>
      </button>
      <table id="tabla" className="tabla">
        <thead id="titulos">
          <th className="o">NUM.</th>
          <th className="m1">IMEI</th>
          <th className="m2">COLOR</th>
          <th className="m3">MODIF.</th>
          <th className="n">VENDER</th>
        </thead>
        <tbody id="lista-tabla">
          {list}

          {aniadir ? (
            <>
              <td className="ele">
                <div className="vacioEle"></div>
              </td>
              <td className="ele">
                <div className="mens123">
                  {" "}
                  <input
                    type="number"
                    className="imei"
                    id="aniadirImei"
                    onKeyDown={handleKeyDown}
                    onChange={handleImeiChange}
                    onInput={(e) => limitarDigitos(e.target, 15)}
                    onPaste={handlePaste}
                  ></input>
                  {errorImei && (
                    <p className="errorMensaje">
                      El IMEI debe tener 15 dígitos.
                    </p>
                  )}
                </div>
              </td>

              <td className="ele">
                <div className="mens123">
                  <input
                    className="color pre"
                    id="aniadirColor"
                    onChange={handleColorChange}
                    onInput={(e) => limitarDigitos(e.target, 15)}
                  ></input>
                  {errorColor && <p className="errorMensaje">{errorColor}</p>}
                </div>
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
                <Aviso
                  image={cruz}
                  estiloImagen={"contBotones"}
                  mensaje="¿Está seguro de cancelar el registro?"
                  estilos={"cancelarPP"}
                  bt1Nombre={"Sí"}
                  bt1Estilo={"botonSi"}
                  bt1Funcion={() => {
                    setAniadir(false);
                  }}
                  bt2Nombre={"No"}
                  bt2Estilo={"botonNo"}
                />
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
  const [comprar, setComprar] = useState(props.vendido);
  const [datos, setDatos] = useState({});
  const { listaVenta, setListaVenta } = useContext(Context);
  const [errorImei, setErrorImei] = useState(false);
  const [color, setColor] = useState("");
  const [errorColor, setErrorColor] = useState(false);
  const [men, setMen] = useState("");
  const [error, setError] = useState(false);
  const [mensajeError, setMensaje] = useState("");

  const modificarProducto = () => {
    const imei = document.getElementById(props.item.imei + "imei");
    const color = document.getElementById(props.item.imei + "color");
    imei.disabled = false;
    imei.value = props.item.imei;
    color.disabled = false;
    color.value = props.item.color;
    color.disabled = false;
    color.value = props.item.color;
    imei.placeholder = "";
    color.placeholder = "";
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
      if (aceptar && !errorColor && !errorImei) {
        props.item.imei = imei.value;
        props.item.color = color.value;
      } else {
        setErrorColor(false);
        setErrorImei(false);
      }
      color.value = "";
      imei.value = "";
      console.log(props.item);
      const result = {
        id: props.item.id,
        imei: props.item.imei,
        color: props.item.color,
      };
      imei.placeholder = props.item.imei;
      color.placeholder = props.item.color;
      resolve(result);
    });
  };

  const agregarALista = () => {
    const producto = {
      ruta: props.ruta,
      modelo: props.modelo,
      precio: props.precio,
      marca: props.marca,
      imei: props.item.imei,
      color: props.item.color,
      id: props.item.id,
    };
    agregarElemento(producto);
    listaVenta.push(producto);
    setComprar(true);
    console.log(listaVenta);
  };

  const handleImeiChange = (event) => {
    const imei = event.target.value;
    console.log("aaaa");
    if (imei.length !== 15) {
      setErrorImei(true); // Mostrar mensaje de error si el IMEI no tiene 15 dígitos
    } else {
      setErrorImei(false); // Limpiar el mensaje de error si el IMEI tiene 15 dígitos
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "e" || event.key === "+" || event.key === "-") {
      event.preventDefault();
      console.log("entramos?");
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    const cleanedText = pastedText.replace(/[e+]/gi, ""); // Eliminar 'e' y '+'
    document.execCommand("insertText", false, cleanedText);
  };  
  const handleColorChange = (event) => {
    const inputValue = event.target.value;
    const input = document.getElementById(props.item.imei + "color");
    const validCharacters = /^[ A-Za-z\s]+$/;
    const isValidLength = input.value.length >= 3 && input.value.length <= 15;    
    console.log(isValidLength);
    if (isValidLength) {
      if (validCharacters.test(inputValue)) {
        setColor(inputValue);
        setErrorColor(false);
        setMensaje("");
      } else {
        setColor(inputValue);
        setErrorColor(true);
        setMensaje("El color solo debe contener letras.");
      }
    } else {
      if (inputValue.length === 0) {
        setErrorColor(true);
        setMensaje("El campo es obligatorio"); // Mostrar mensaje de error si el color no tiene 3 o15 dígitos
      } else {
        setErrorColor(true); // Limpiar el mensaje de error si el color tiene 3 o15 dígitos
        setMensaje("El color debe tener entre 3 y 15 caracteres.");
      }
    }
  };

  return (
    <>
      <tr id={props.item.imei} className="fila">
        <td className="ele">
          <p className="numero">{props.contador}</p>
        </td>
        <td className={comprar ? "eleComprado" : "ele"}>
          <input
            type="number"
            className="imei"
            id={props.item.imei + "imei"}
            placeholder={props.item.imei}
            onInput={(e) => limitarDigitos(e.target, 15)}
            onPaste={handlePaste}
            onChange={handleImeiChange}
            onKeyDown={handleKeyDown}
            disabled
          ></input>
          {errorImei && (
            <p className="errorMensaje">El IMEI debe tener 15 dígitos.</p>
          )}
        </td>
        <td className={comprar ? "eleComprado" : "ele"}>
          <input
            className="color pre"
            id={props.item.imei + "color"}
            placeholder={props.item.color}
            disabled
            onChange={handleColorChange}
            onInput={(e) => limitarDigitos(e.target, 15)}
          ></input>
          {errorColor && <p className="errorMensaje">{mensajeError}</p>}
        </td>
        {modificar ? (
          <>
            <td>
              <Mensaje3
                nombre=" ✔ "
                estilos={"modificar-aceptar"}
                funcion={() => {
                  aceptarCancelar(true).then((res) => {
                    console.log(res);
                    modificarMovil(res).then((result) => {
                      setMen(result.data.message);
                      setError(result.data.error);
                    });
                    setModificar(false);
                    document.getElementById(
                      props.item.imei + "imei"
                    ).disabled = true;
                    document.getElementById(
                      props.item.imei + "color"
                    ).disabled = true;
                  });
                }}
                mensaje={men}
                error={error}
              />
              {/* <Mensaje3
                  nombre=" ✔ "
                  estilos={"modificar-aceptar"}
                  funcion={() => {
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
                  mensaje={"modificado correctamente"}
                  error={true}
                />  */}
            </td>
            <td>
              <Aviso
                image={cruz}
                estiloImagen={"contBotones"}
                mensaje="¿Está seguro de descartar los cambios?"
                estilos={"cancelarPP"}
                bt1Nombre={"Sí"}
                bt1Estilo={"botonSi"}
                bt1Funcion={() => {
                  aceptarCancelar(false);
                }}
                bt2Nombre={"No"}
                bt2Estilo={"botonNo"}
              />
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
                <img className="contBotones" src={lapiz}></img>
              </button>
            </td>
            <td className="ele">
              <button className="vender-cancelar" onClick={agregarALista}>
                <img className="contBotones" src={imgVender}></img>
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );
};
