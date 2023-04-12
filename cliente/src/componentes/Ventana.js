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
import { CajaTexto } from "./CajaTexto";
import { ComboBox } from "./ComboBox";
import "../estilos/ventana.css";
import "../estilos/boton.css";
import { Aviso } from "./Aviso";
import { Producto } from "./Producto";
import React, { useState, useEffect, createContext, useContext } from "react";
import { prueba } from "./VentanaPrincipal";



export const VentanaFormulario = (props) => {
  const [,guardar,setGuardar] = useContext(prueba);
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
      <CajaTexto nombre={"Cambiar nombre*"} id={"nombreModelo"} />
      <br />
      <CajaTexto nombre={"Cambiar descripción*"} id={"descripcion"} />
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
              guardarImagen()
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
            />
          ) : (
            <Aviso
              nombre="CANCELAR"
              mensaje="¿Está seguro de descartar los cambios?"
              estilos={"cancelar"}
            />
          )}
        </div>
      </div>
  );
};

export const Ventana = (props) => {
  let guardar = useContext(prueba)[1]
  const [productos, setProductos] = useState({});

  useEffect(() => {
    const getProdructo = async () => {
      const result = await instancia.get("/getAllModeloDispositivo");
      setProductos(result.data);
      console.log(result.data);
      console.log(guardar);
    };
    getProdructo();
  },[]);

  let prod = productos.modelos?.map((pro)=>{
    console.log(pro) 
    return (<>
    <Producto ruta={pro.ruta_imagen} etiqueta={pro.etiqueta} nombre={pro.nombre}/>
    </>)
  })

  return (
    <div>
      <div className="ventana-productos">
       {prod}

      </div>
    </div>
  );
};
