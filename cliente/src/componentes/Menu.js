import { Boton } from "./Boton";
import { Categoria } from "./Categoria";
import '../estilos/menu.css'
import { mdiArchiveOutline } from "@mdi/js";

export const Menu = () => {
  return (
    <div className="menu">
      <Boton nombre={"Registar modelo"} ico={mdiArchiveOutline}/>
      <Boton nombre={"Modificar modelo"} />
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
