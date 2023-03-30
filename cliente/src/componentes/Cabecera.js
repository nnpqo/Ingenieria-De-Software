import { Boton } from "./Boton";
import "../estilos/cabecera.css";
import { Link, Outlet } from "react-router-dom";

export const Cabecera = () => {
  return (
    <div className="cabecera">
      <Boton nombre={"JDKCELL"} estilos={'boton-navbar'}/>
      <Boton nombre={"Producto"} />
      <Boton />
      <Outlet />
    </div>
  );
};
