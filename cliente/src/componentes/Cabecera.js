import { Boton } from "./Boton";
import "../estilos/cabecera.css";

export const Cabezera = () => {
  return (
    <div className="cabecera">
      <Boton nombre={"JDKCELL"} />
      <Boton nombre={"Producto"} />
      <Boton />
    </div>
  );
};
