import { Boton } from "./Boton";
<<<<<<< HEAD
import "../estilos/cabecera.css";

export const Cabezera = () => {
  return (
    <div className="cabecera">
=======
import { Link, Outlet } from "react-router-dom";
export const Cabezera = () => {
  return (
    <div>
      
>>>>>>> main
      <Boton nombre={"JDKCELL"} />
      <Boton nombre={"Producto"} />
      <Boton />
      <Outlet />
    </div>
  );
};
