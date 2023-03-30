import { Boton } from "./Boton";

export const Ventana = (props) => {
  const opciones = props.options.map((option) =>
  <option key={option}>{option}</option>
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
        <Boton nombre={"GUARDAR"}  />
        <Boton nombre={"CANCELAR"} />
      </div>
    </div>
  );
}
