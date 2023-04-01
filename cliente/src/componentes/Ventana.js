import { Boton } from "./Boton";
import { getModeloDispositivos, imagen, setModeloDispositivo } from "../API/api";
export const VentanaFormulario = (props) => {
  const opciones = props.opciones.map((opciones) => (
    <opciones key={opciones}>{opciones}</opciones>
  ));
  return (
    <div>
      <div className="titulo-Ventana">
        <h1>{props.titulo}</h1>
      </div>
      <div className="formulario">{opciones}</div>
      <div className="Guardar-Cancelar">
        <Boton nombre={"GUARDAR"} funcion={getModeloDispositivos} />
        <Boton nombre={"CANCELAR"} funcion={()=>setModeloDispositivo({hola : "hoal"})}/>
      </div>

      <input type={"file"} id="image" onChange={imagen} accept="image/png, image/jpeg"></input>
    </div>
  );
};
export const Ventana = (props) => {
  const opciones = props.opciones.map((opciones) => (
    <opciones key={opciones}>{opciones}</opciones>
  ));
  return (
    <div>
      <div className="titulo-Ventana">
        <h1>{props.titulo}</h1>
      </div>
      <div className="formulario">{opciones}</div>
      <div className="Guardar-Cancelar">
        <Boton nombre={"GUARDAR"} funcion={getModeloDispositivos} />
        <Boton nombre={"CANCELAR"} />
      </div>
    </div>
  );
};
