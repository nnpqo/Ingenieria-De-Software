import { Boton } from "./Boton";
import '../estilos/cabecera.css';

export const Cabezera = () => {
  return (
    <div className="botones">
      <Boton nombre={"JDKCELL"} estilos ={'boton-navbar'}/>
      <Boton  nombre ={"Producto"}estilos ={'boton-navbar-pro'}/>
      <Boton />
    </div>
  );
};
