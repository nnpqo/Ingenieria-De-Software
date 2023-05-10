import { Boton } from "./Boton";
import "../estilos/cabecera.css";
import { Link, Outlet } from "react-router-dom";
import { Busqueda } from "./Busqueda";
import { useState } from "react";

export const Cabecera = (props) => {
  return (
    <>
      <header className="cabecera">
        <div className="home">
          <Link to="/home">
            <Boton
              nombre={
                <>
                  <span className="jdk">JDK</span>
                  <span className="cell">CELL</span>
                  <span>{}</span>
                </>
              }
              estilos={"boton-navbar"}
            />
            
          </Link>
        </div>
        <Busqueda visible={props.barra} actualizar={props.actualizar}></Busqueda>
        
        <div className="opciones-navbar">
          
          <Link to="/productos">
            <Boton nombre={"Producto"} estilos={"boton-navbar-pro"} />
          </Link>
          <Link to="/venta">
            <Boton nombre={"Venta"} estilos={"boton-navbar-pro"} />
          </Link>
        </div>
        <Boton estilos={"boton-usuario"} />
      </header>
      <Outlet />
    </>
  );
};
