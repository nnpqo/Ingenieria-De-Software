import { Boton } from "./Boton";
import { Categoria } from "./Categoria";
import "../estilos/menu.css";
import { mdiArchiveOutline } from "@mdi/js";
import { useContext, useEffect, useState } from "react";
import { prueba } from "./VentanaPrincipal";


import("../estilos/menu.css");

export const Menu = () => {
  const {ventana, setVentana } = useContext(prueba);
  
  return (
    <div className="menuIzquierda">
      <Boton
        nombre={"Registrar dispositivo"}
        estilos={ventana === 0 ? "boton-registro-activado" : "boton-registro"}
        funcion={() => {
          setVentana(0);
          
        }}
      />
      <Boton
        nombre={"Modificar dispositivo"}
        estilos={ ventana === 1 ? "boton-modificar-activado" : "boton-modificar"}
        funcion={() => {
          setVentana(1);

        }}
      />
    </div>
  );
};

export const MenuEtiquetas = (props) => {
  return (
    <div className="contenedor-categoria">
      <span className="categoria1">Categorías</span>
      <div className="modeloCateg">
        <Categoria
          manejarSelecciónSelection={props.manejarSelecciónSelection}
        />
      </div>
    </div>
  );
};
