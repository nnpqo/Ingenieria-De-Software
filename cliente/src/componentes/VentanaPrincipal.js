import { Cabezera } from "./Cabecera";
import { Menu,MenuEtiquetas } from "./Menu";
import { Ventana } from "./Ventana";
import "../estilos/app.css";

export const VentanaPrincipal = (props) => {
  return (
    <div>
      {props.menu === 1 && <Menu />}
      {props.menu === 2 && <MenuEtiquetas />}
        <Ventana />
    </div>
  );
};
