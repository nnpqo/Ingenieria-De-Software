import { Boton } from "./Boton";
import { setModeloDispositivo,updateModeloDispositivo } from "../API/api";
import { ImagenFormulario } from "./ImagenFormulario";
import { CajaTexto } from "./CajaTexto";
import { ComboBox } from "./ComboBox";
import "../estilos/ventana.css";
import "../estilos/boton.css";

export const VentanaFormulario = (props) => {
  const modelos = ["p30 pro", "galaxy s20", "redmi note 11"];
  const etiquetas = ["xiaomi", "samsumg"];
  const opcionesModificar = <>
    <ComboBox nombre={"Modelo*"} opciones={modelos} id={'modelo'} />
    <CajaTexto nombre={"cambiar Nombre*"}  id={'nombreModelo'}/>
    <CajaTexto nombre={"cambiar Descripcion*"}  id={'descripcion'}/>
    <ComboBox nombre={"Etiquetas"} opciones={etiquetas} id={'etiqueta'}/>
    </>
  const opcionesRegistro = <>
    <CajaTexto nombre={"Nombre*"} id={'nombreModelo'}/>
    <CajaTexto nombre={"descripcion*"} id={'descripcion'}/>
    <ComboBox nombre={"etiquetas"} opciones={etiquetas} id={'etiqueta'}/>
    </>


  return (
    <div className="ventana-formulario">
      <p className="direccion"> producto / Añadir dispositivo </p>
      {props.imagen === true && <ImagenFormulario />}
      <div className="titulo-Ventana">
        <h1>{props.titulo}</h1>
      </div>
      <div className="formulario">
        {props.tipo === 'registro' && opcionesRegistro}
        {props.tipo === 'modificar' && opcionesModificar}
        </div>
      <div className="Guardar-Cancelar">
        <Boton
          nombre={"GUARDAR"}
          estilos={"guardar"}
          funcion={()=>{if (props.tipo== 'registro') setModeloDispositivo();
                        else updateModeloDispositivo()}}
        />
        <Boton nombre={"CANCELAR"} estilos={"cancelar"} />
      </div>
    </div>
  );
};



export const Ventana = (props) => {
  
  return (
    <div className="ventana-modelos">
      <p>categorias &gt; dispositivos moviles &gt; samsumg</p>
    </div>
  );
};
