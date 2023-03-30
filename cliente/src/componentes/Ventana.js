import { Boton } from "./Boton";
import {getModeloDispositivos} from "../API/api";
export const Ventana = (props) => {
  const opciones = props.opciones.map((opciones) =>
  <opciones key={opciones}>{opciones}</opciones>
);
  return (
    <div>
      <div className="titulo-Ventana">
        <h1>{props.titulo}</h1>
      </div>
      <div className="formulario">
        {opciones}
      </div>
      <div className="Guardar-Cancelar">
        <Boton nombre={"GUARDAR"} funcion={getModeloDispositivos} />
        <Boton nombre={"CANCELAR"} />
      </div>
    </div>
  );
}
