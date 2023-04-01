import { Boton } from "./Boton";
import "../estilos/cabecera.css";
import { Link, Outlet } from "react-router-dom";

export const Cabecera = () => {
  return (<>
    <div className="cabecera">
    <Link to="/"><Boton nombre={"JDKCELL"} estilos={'boton-navbar'}/></Link>
    <Link to="/productos"><Boton nombre={"Producto"} /></Link>
    <Boton />
      
    </div>
    <Outlet />
    </>
  );
};
