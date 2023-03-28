import { Cabezera } from "./componentes/Cabecera";
import { Menu } from "./componentes/Menu";
import { Ventana } from "./componentes/Ventana";
import { Component } from "react";

export const App = () => {
  return (
    <div>
      <Cabezera />
      <div>
        <Menu />
        <Ventana />
      </div>
    </div>
  );
};
