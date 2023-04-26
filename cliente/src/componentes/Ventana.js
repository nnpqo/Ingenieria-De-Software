import { Boton } from "./Boton";

import {
  instancia,
  setModeloDispositivo,
  updateModeloDispositivo,
  getNombreModeloDispositivos,
  getEtiquetas,
  guardarImagen,
} from "../API/api";
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
          regex={"[0-9]+"}
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
        <CajaTexto nombre={"Precio*"} id={"precio"} max={6} regex={"[0-9]+"} />
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
                  bt1Funcion={borrar}
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
  let guardar = useContext(prueba)[1];

  const [productos, setProductos] = useState({});
  const [etiquetas, setEtiquetas] = useState([]);

  useEffect(() => {
    const getProdructo = async () => {
      const result = await instancia.get("/getAllModeloDispositivo");
      setProductos(result.data);
      console.log(result.data);
      console.log(guardar);
    };
    getProdructo();
    setEtiquetas(props.lista);
    console.log(etiquetas);
  }, [props.lista]);

  let prod = productos.modelos?.map((pro) => {
    if (etiquetas.length == 0) {
      return (
        <>
          <Producto
            ruta={pro.ruta_imagen}
            etiqueta={pro.etiqueta}
            nombre={pro.nombre}
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
                ruta={pro.ruta_imagen}
                etiqueta={pro.etiqueta}
                nombre={pro.nombre}
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
      <div className="ventana-productos">{mostrarProd}</div>
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

const alerts = () => {
  // const inputNombre = document.getElementById("nombreModelo");
  // const inputDescripcion = document.getElementById("descripcion");
  // if (
  //   inputNombre.validity.patternMismatch ||
  //   inputNombre.validity.tooLong ||
  //   inputNombre.validity.tooShort ||
  //   inputNombre.validity.valueMissing
  // ) {
  //   alert("nombre de producto no válido");
  // } else {
  //   if (
  //     inputDescripcion.validity.tooShort ||
  //     inputDescripcion.validity.tooLong ||
  //     inputDescripcion.validity.valueMissing
  //   ) {
  //     alert("descripcion no válido");
  //   }
  // }
};
