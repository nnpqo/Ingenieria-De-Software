import { Boton } from "./Boton";
import { Categoria } from "./Categoria";
import Icon from "@mdi/react";
import { mdiArchiveOutline } from "@mdi/js";

export const Menu = () => {
  return (
    <div>
      <Boton nombre={"Registar modelo"} ico={<Icon path={mdiArchiveOutline} size={1}/>}/>
      <Boton nombre={"Modificar modelo"} ico={""}/>
    </div>
  );
};
export const MenuEtiquetas = () => {
  return (
    <div>
      <h1>Categorias</h1>
      <Categoria />
    </div>
  );
};
