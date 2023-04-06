import { Boton } from "./Boton";
import { setModeloDispositivo, updateModeloDispositivo } from "../API/api";
import { ImagenFormulario } from "./ImagenFormulario";
import { CajaTexto } from "./CajaTexto";
import { ComboBox } from "./ComboBox";
import "../estilos/ventana.css";
import "../estilos/boton.css";
import { Aviso } from "./Aviso";
import { Producto } from "./Producto";

export const VentanaFormulario = (props) => {
  //const modelos= Object.values(data);
  const modelos = ["p30 pro", "galaxy s20", "redmi note 11"];
  //const etiquetas= Object.values(data);
  const etiquetas = ["xiaomi", "samsumg"];
  const opcionesModificar = (
    <>
      <ComboBox nombre={"Modelo*"} opciones={modelos} id={"modelo"} />
      <CajaTexto nombre={"cambiar Nombre*"} id={"nombreModelo"} />
      <CajaTexto nombre={"cambiar Descripcion*"} id={"descripcion"} />
      <ComboBox nombre={"Etiquetas"} opciones={etiquetas} id={"etiqueta"} />
    </>
  );
  const opcionesRegistro = (
    <>
      <CajaTexto nombre={"Nombre*"} id={"nombreModelo"} />
      <CajaTexto nombre={"Descripción*"} id={"descripcion"} />
      <ComboBox nombre={"Etiquetas*"} opciones={etiquetas} id={"etiqueta"} />
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
      <div className="Guardar-Cancelar">
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
  return (
    <div>
      <div className="ventana-productos">
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
        <Producto />
      </div>
    </div>
  );
};
