import { Boton } from "./Boton";

import {
  instancia,
  setModeloDispositivo,
  updateModeloDispositivo,
  getNombreModeloDispositivos,
  getEtiquetas,
  guardarImagen,
} from "../API/api";
import { getDispositivosBusqueda } from "../API/productos";
import { ImagenFormulario } from "./ImagenFormulario";
import { CajaTexto, TextArea } from "./CajaTexto";
import { ComboBox } from "./ComboBox";
import "../estilos/ventana.css";
import "../estilos/boton.css";
import { Aviso } from "./Aviso";
import { Producto } from "./Producto";
import React, { useState, useEffect, createContext, useContext } from "react";
import { prueba } from "./VentanaPrincipal";
import { borrar } from "./Aviso";
import { Bienvenida } from "./Bienvenido";

export const VentanaFormulario = (props) => {
  const [, guardar, setGuardar] = useContext(prueba);
  //const modelos = ["p30 pro", "galaxy s20", "redmi note 11"];
  const [modelos, setmodelos] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);

  useEffect(() => {
    getEtiquetas().then((nombres) => setEtiquetas(nombres));
    getNombreModeloDispositivos().then((nombres) => setmodelos(nombres));
  }, []);
  //const etiquetas = ["xiaomi", "samsumg"];
  const opcionesModificar = (
    <div className="formulario">
      <ComboBox nombre={"Modelo*"} opciones={modelos} id={"modelo"} />
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
        <ComboBox nombre={"Etiquetas"} opciones={etiquetas} id={"etiqueta"} />
        <CajaTexto
          nombre={"Cambiar precio"}
          id={"precio"}
          max={6}
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
        <ComboBox nombre={"Etiqueta*"} opciones={etiquetas} id={"etiqueta"} />
        <CajaTexto
          nombre={"Precio*"}
          id={"precio"}
          min={1}
          max={6}
          regex={"^[1-9][0-9]*$"}
        />
      </div>
      <br />
    </div>
  );

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
              <Boton
                nombre={"GUARDAR"}
                estilos={"guardar"}
                funcion={() => {
                  guardarImagen();
                  if (props.tipo === "registro") {
                    setModeloDispositivo();
                  } else {
                    updateModeloDispositivo();
                  }
                }}
              />
              {props.tipo === "registro" ? (
                <Aviso
                  nombre="CANCELAR"
                  mensaje="¿Está seguro de cancelar el registro?"
                  estilos={"cancelar"}
                  bt1Nombre={"Si"}
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
                  bt1Nombre={"Si"}
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
  const [productos, setProductos] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [cambioVisible, setcambioVisible] = useState(false);

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
  }, [props.lista, cambioVisible, props.busqueda]);

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
          if (pro.visible === 1) {
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
          }
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
