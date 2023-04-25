import { Boton } from "./Boton";
import "../estilos/cabecera.css";
import { Link, Outlet } from "react-router-dom";

export const Cabecera = () => {
  return (
    <>
      <header className="cabecera">
        <div className="home">
          <Link to="/">
            <Boton
              nombre={
                <>
                  <span className="jdk">JDK</span>
                  <span className="cell">CELL</span>
                </>
              }
              estilos={"boton-navbar"}
            />
          </Link>
        </div>
        <div className="barra-buscar">
          <input type="text" class="estilo-input" placeholder="Buscar" id="buscar"></input>
          <button class="contenedor-icono" onClick={()=>{}}></button>
        </div>
        <div className="opciones-navbar">
          <Link to="/productos">
            <Boton nombre={"Producto"} estilos={"boton-navbar-pro"} />
          </Link>
        </div>
        <Boton estilos={"boton-usuario"} />
      </header>
      <Outlet />
    </>
  );
};
