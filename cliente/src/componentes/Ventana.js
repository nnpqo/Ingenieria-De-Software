import { Boton } from "./Boton";
import {
  setModeloDispositivo,
  updateModeloDispositivo,
  getNombreModeloDispositivos,
  getEtiquetas,
  guardarImagen,
} from "../API/api";
import { getDispositivosBusqueda, getProducto } from "../API/productos";
import { ImagenFormulario } from "./ImagenFormulario";
import { CajaTexto, TextArea } from "./CajaTexto";
import { ComboBox } from "./ComboBox";
import "../estilos/ventana.css";
import "../estilos/boton.css";
import { Aviso, Mensaje3 } from "./Aviso";
import { Producto } from "./Producto";
import React, { useState, useEffect, useContext } from "react";

import { borrar } from "./Aviso";
import { Bienvenida } from "./Bienvenido";
import { Context } from "../Context/Context";

export const VentanaFormulario = (props) => {
  //const modelos = ["p30 pro", "galaxy s20", "redmi note 11"];
  const [modelos, setmodelos] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [men, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const [seleccion, setSeleccion] = useState(false);
  const {listaVenta,setListaVenta} =useContext(Context)

  useEffect(() => {
    getEtiquetas().then((nombres) => setEtiquetas(nombres));
    getNombreModeloDispositivos().then((nombres) => setmodelos(nombres));
  }, []);

  const opcionesModificar = (
    <div className="formulario">
      <ComboBox
        nombre={"Modelo*"}
        opciones={modelos}
        id={"modelo"}
        click={() => {
          document.querySelector(
            '#modelo option[value="tituloComboBox"]'
          ).disabled = true;
        }}
        recuperar={() => {
          const combox = document.getElementById("modelo").value;
          getProducto(combox).then((res) => {
            console.log(res);
            const pro = res.producto[0][0];
            document.getElementById("descripcion").value = pro.descripcion;
            document.getElementById("nombreModelo").value = pro.modelo;
            document.getElementById("precio").value = pro.precio;
            document.getElementById("previsualizar").src =
              process.env.REACT_APP_API_URL + pro.ruta;
            document.getElementById("etiqueta2").value = pro.marca;
          });
        }}
        vacio={
          <>
            <option value="tituloComboBox">seleccione dispositivo</option>
          </>
        }
      />
      <br />
      <CajaTexto
        nombre={"Cambiar nombre"}
        id={"nombreModelo"}
        max={30}
        min={2}
        regex={"[ a-zA-Z0-9]+"}
      />
      <br />
      <TextArea
        nombre={"Cambiar descripción"}
        id={"descripcion"}
        max={200}
        min={10}
      />
      <br />
      <div className="etiqueta_precio">
        <ComboBox nombre={"Etiquetas"} opciones={etiquetas} id={"etiqueta2"} />
        <CajaTexto
          nombre={"Cambiar precio"}
          id={"precio"}
          max={5}
          regex={"^[1-9][0-9]*$"}
        />
      </div>
    </div>
  );

  const opcionesRegistro = (
    <div className="formulario">
      <CajaTexto
        nombre={"Nombre*"}
        id={"nombreModelo"}
        max={30}
        min={2}
        regex={"[ a-zA-Z0-9]+"}
      />
      <br />
      <TextArea nombre={"Descripción*"} id={"descripcion"} max={200} min={10} />
      <br />
      <div className="etiqueta_precio">
        <ComboBox nombre={"Etiqueta*"} opciones={etiquetas} id={"etiqueta2"} />
        <CajaTexto
          nombre={"Precio*"}
          id={"precio"}
          min={1}
          max={5}
          regex={"^[1-9][0-9]*$"}
        />
      </div>
      <br />
    </div>
  );
  const actualizarListaCompra = () => {
    const modelo = document.getElementById("modelo").value;
    const nombre = document.getElementById("nombreModelo").value.trim();
    const etiqueta = document.getElementById("etiqueta2").value;
    const imagen = document.getElementById("image").files;
    const precio = document.getElementById("precio").value;
    const rutaImg = imagen[0] ? "/images/" + imagen[0].name : "";
    console.log('ruta:' + rutaImg)
    let nuevaLista = listaVenta.map((item) => {
      if (item.modelo === modelo) {
        if(rutaImg===""){ return { ...item, modelo:nombre,marca:etiqueta,precio:precio};}
        else{ return { ...item,ruta: rutaImg, modelo:nombre,marca:etiqueta,precio:precio};}
      }
      return item;
    })
    setListaVenta(nuevaLista);
  }

  return (
    <div className="ventana-formulario">
      <p className="direccion">
        {" "}
        Home &gt; Producto &gt;{" "}
        {props.tipo === "registro"
          ? "Registrar modelo de dispositivo móvil"
          : "Modificar dispositivo"}{" "}
      </p>
      <div className="formulario">
        <div className="titulo-Ventana">
          <h1>{props.titulo}</h1>
        </div>
        <div className="contenedorImagenForm">
          {props.imagen === true && <ImagenFormulario />}
          <div className="campos">
            {props.tipo === "registro" && opcionesRegistro}

            {props.tipo === "modificar" && opcionesModificar}

            <div className="botones">
              {props.tipo === "registro" ? (
                <Mensaje3
                  nombre="GUARDAR"
                  estilos={"guardar"}
                  funcion={() => {
                    inputArtificial();
                    guardarImagen();
                    setModeloDispositivo().then((result) => {
                      setMensaje(result.message);
                      setError(result.error);
                    });
                  }}
                  mensaje={men}
                  error={error}
                />
              ) : (
                <Mensaje3
                  nombre="GUARDAR"
                  estilos={"guardar"}
                  bt1Nombre={"OK"}
                  bt1Estilo={"botonOk"}
                  funcion={() => {
                    const option = document.getElementById("modelo").value;
                    if (option === "tituloComboBox") {
                      setMensaje(
                        "Error al modificar: \n Seleccione un dispositivo"
                      );
                      setError(true);
                    } else {
                      inputArtificial();
                      guardarImagen();
                      updateModeloDispositivo().then((result) => {
                        setMensaje(result.message);
                        setError(result.error);
                      });
                      actualizarListaCompra();
                    }
                  }}
                  mensaje={men}
                  error={error}
                />
              )}
              {props.tipo === "registro" ? (
                <Aviso
                  nombre="CANCELAR"
                  mensaje="¿Está seguro de cancelar el registro?"
                  estilos={"cancelar"}
                  bt1Nombre={"Sí"}
                  bt1Estilo={"botonSi"}
                  bt1Funcion={borrar}
                  bt2Nombre={"No"}
                  bt2Estilo={"botonNo"}
                />
              ) : (
                <Aviso
                  nombre="CANCELAR"
                  mensaje="¿Está seguro de descartar los cambios?"
                  estilos={"cancelar"}
                  bt1Nombre={"Sí"}
                  bt1Estilo={"botonSi"}
                  bt1Funcion={borrar}
                  bt2Nombre={"No"}
                  bt2Estilo={"botonNo"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Ventana = (props) => {
  const { buscar, visible, setVisible } = useContext(Context);
  const [productos, setProductos] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [cambioVisible, setcambioVisible] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(!reload)
  }, [visible])

  useEffect(() => {
    const getProdructos = new Promise((resolve, reject) => {
      let palabra =
        document.getElementById("buscar").value !== ""
          ? document.getElementById("buscar").value
          : "&";
      const result = getDispositivosBusqueda(palabra);
      console.log("borrado");
      result ? resolve(result) : reject([]);
    });
    getProdructos
      .then((result) => {
        setProductos(result.dispositivos[0]);
      })
      .catch((e) => setProductos([]));
    console.log(productos);
    setEtiquetas(props.lista);
    console.log(etiquetas);
  }, [props.lista, visible, buscar, reload]);

  let prod = productos?.map((pro) => {
    if (etiquetas.length === 0) {
      return (
        <>
          <Producto
            id={pro.id}
            ruta={pro.ruta_imagen}
            etiqueta={pro.etiqueta}
            nombre={pro.nombre}
            caracteristicas={pro.descripcion}
            precio={pro.precio}
          />
        </>
      );
    } else {
      return etiquetas.map((eti) => {
        if (pro.etiqueta === eti) {
          console.log(eti);
          return (
            <>
              <Producto
                cambioVisible={cambioVisible}
                funActualizar={setcambioVisible}
                id={pro.id}
                ruta={pro.ruta_imagen}
                etiqueta={pro.etiqueta}
                nombre={pro.nombre}
                caracteristicas={pro.descripcion}
                precio={pro.precio}
              />
            </>
          );
        } else {
          return false;
        }
      });
    }
  });

  let prodFiltrado = prod?.flat().filter((valor) => {
    return valor;
  });

  let mostrarProd =
    prodFiltrado && prodFiltrado.length > 0 ? prodFiltrado : sinProducto();

  return (
    <>
      <div className="ventana-productos">
        {etiquetas.length === 0 ? (
          <Bienvenida />
        ) : (
          <>
            {prodFiltrado.length > 0 && (
              <>
                <div className="mens-bus">
                  <p>
                    Se encontraron {mostrarProd.length} modelos que coinciden
                    con su búsqueda
                  </p>
                </div>
              </>
            )}
            <div className="pro">{mostrarProd}</div>
          </>
        )}
      </div>
    </>
  );
};

const sinProducto = () => {
  return (
    <div className="contenedor-enunciado">
      <div id="container">
        <div id="spooky">
          <div id="body">
            <div id="eyes"></div>
            <div id="mouth"></div>
            <div id="feet">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div id="shadow"></div>
      </div>
      <h1 className="sin-producto">
        Lo siento, no hemos encontrado resultados
      </h1>
      <h1 className="sin-producto1">que coincidan con tu búsqueda</h1>
    </div>
  );
};
export const inputArtificial = () => {
  var inputs = document.querySelectorAll("input[type='text'], textarea");

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].dispatchEvent(new Event("input", { bubbles: true }));
  }
};
