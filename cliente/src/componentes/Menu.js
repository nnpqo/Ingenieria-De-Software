import { Boton } from "./Boton";
import { Categoria } from "./Categoria";
import "../estilos/menu.css";
import { mdiArchiveOutline } from "@mdi/js";
import { useContext, useEffect, useState } from "react";
import { prueba } from "./VentanaPrincipal";
import("../estilos/menu.css");

export const Menu = () => {
  const [setVentana] = useContext(prueba);
  return (
    <div className="menuIzquierda">
      <Boton
        nombre={"Registrar modelo"}
        estilos={"boton-registro"}
        funcion={() => {
          setVentana(0);
        }}
      />
      <Boton
        nombre={"Modificar modelo"}
        estilos={"boton-modificar"}
        funcion={() => {
          setVentana(1);
        }}
      />
    </div>
  );
};

export const MenuEtiquetas = () => {
  return (
    <div className="menuIzquierda" >
      <span className="categoria1">Categorias</span>
      <div className="modeloCateg"> <Categoria/></div>
    </div>
  );
};
