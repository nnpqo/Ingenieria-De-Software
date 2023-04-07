import { Boton } from "./Boton";
import { setModeloDispositivo, updateModeloDispositivo,getModeloDispositivos,getEtiquetas,getNombreModeloDispositivos} from "../API/api";
import { ImagenFormulario } from "./ImagenFormulario";
import { CajaTexto } from "./CajaTexto";
import { ComboBox } from "./ComboBox";
import "../estilos/ventana.css";
import "../estilos/boton.css";
import { Aviso } from "./Aviso";
import { Producto } from "./Producto";
import React, { useState, useEffect } from "react";

export const VentanaFormulario = (props) => {
  
  //const modelos = ["p30 pro", "galaxy s20", "redmi note 11"];
  const [modelos, setmodelos] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);

  useEffect(() => {
    getEtiquetas().then((nombres) => setEtiquetas(nombres));
    getNombreModeloDispositivos().then((nombres) => setmodelos(nombres));    
  }, []);
  //const etiquetas = ["xiaomi", "samsumg"];
  const opcionesModificar = (
    <>
      <ComboBox nombre={"Modelo*"} opciones={modelos} id={"modelo"} />
      <br />
      <CajaTexto nombre={"cambiar Nombre*"} id={"nombreModelo"} />
      <br />
      <CajaTexto nombre={"cambiar Descripcion*"} id={"descripcion"} />
      <br />
      <ComboBox nombre={"Etiquetas"} opciones={etiquetas} id={"etiqueta"} />
    </>
  );
  const opcionesRegistro = (
    <>
      <CajaTexto nombre={"Nombre*"} id={"nombreModelo"} />
      <br />
      <CajaTexto nombre={"Descripción*"} id={"descripcion"} />
      <br />
      <ComboBox nombre={"Etiquetas*"} opciones={etiquetas} id={"etiqueta"} />
      <br />
      <br />
    </>
  );

  return (
    <div className="ventana-formulario">
      <p className="direccion">
        {" "}
        Home &gt; Producto &gt;{" "}
        {props.tipo === "registro"
          ? "Registrar modelo de dispositivo movil"
          : "Modificar dispositivo"}{" "}
      </p>
      {props.imagen === true && <ImagenFormulario />}
      <div className="titulo-Ventana">
        <h1>{props.titulo}</h1>
      </div>
      <div className="formulario">
        {props.tipo === "registro" && opcionesRegistro}
        {props.tipo === "modificar" && opcionesModificar}
      </div>
      <div>
        <Boton
          nombre={"GUARDAR"}
          estilos={"guardar"}
          funcion={() => {
            if (props.tipo == "registro") setModeloDispositivo();
            else updateModeloDispositivo();
          }}
        />
        <Aviso
          nombre="CANCELAR"
          mensaje="¿Está seguro de cancelar el registro?"
          estilos={"cancelar"}
        ></Aviso>
      </div>
    </div>
  );
};

export const Ventana = (props) => {
  const [modelos, setmodelos] = useState([]);

  useEffect(() => {
    getModeloDispositivos().then((nombres) => setmodelos(nombres));
    
  }, []);
  return (
    <div>
      <div className="ventana-productos">
        {modelos.map((modelo, index) => (
          <Producto nombre={modelo.nombre} etiqueta={modelo.etiqueta} ruta={modelo.ruta_imagen} key={index} />
        ))}
      </div>
    </div>
  );
};
