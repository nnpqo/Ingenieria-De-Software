import { Boton } from "./Boton";
import { Categoria } from "./Categoria";
import '../estilos/menu.css'
import { mdiArchiveOutline } from "@mdi/js";
import { useContext, useEffect, useState } from "react";
import { prueba } from "./VentanaPrincipal";

export const Menu = () => {
  const [setVentana]=useContext(prueba)
  
  
  return (
<<<<<<< HEAD
    <div className="menu">
      <Boton nombre={"Registar modelo"} ico={mdiArchiveOutline}/>
      <Boton nombre={"Modificar modelo"} />
=======
    <div>
      <Boton nombre={"Registar modelo"} funcion={()=>{setVentana(0)}} />
      <Boton nombre={"Modificar modelo"} funcion={()=>{setVentana(1)}} />
>>>>>>> main
    </div>
  );
};
export const MenuEtiquetas = () => {
  return (
    <div>
      <span>Categorias</span>
      <Categoria />
    </div>
  );
};
