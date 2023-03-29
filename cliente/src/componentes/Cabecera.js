import { Boton } from "./Boton";
import { Link, Outlet } from "react-router-dom";
export const Cabezera = () => {
  return (
    <div>
      
      <Boton nombre={"JDKCELL"} />
      <Boton  nombre ={"Producto"}/>
      <Boton />
      <Outlet />
    </div>
  );
};
