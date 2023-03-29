import { Boton } from "./Boton";
import { Categoria } from "./Categoria";
import '../estilos/menu.css'

export const Menu = () => {
  return (
    <div className="menu-container">
      <Boton />
      <Boton /> 
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
