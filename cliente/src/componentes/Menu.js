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
    <div className="menu">
      <Boton
        nombre={"Registar modelo"}
        funcion={() => {
          setVentana(0);
        }}
      />
      <Boton
        nombre={"Modificar modelo"}
        funcion={() => {
          setVentana(1);
        }}
      />
    </div>
  );
};

export const MenuEtiquetas = () => {
  return (
    <div className="menu">
      <span>Categorias</span>
      <Categoria />
    </div>
  );
};
