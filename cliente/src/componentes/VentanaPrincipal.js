import { Cabezera } from "./Cabecera";
import { Menu,MenuEtiquetas } from "./Menu";
import { Ventana } from "./Ventana";
import "../estilos/app.css";

export const VentanaPrincipal = (props) => {
  return (
    <div>
      {props.menu === 1 && <MenuEtiquetas />}
      {props.menu === 2 && <Menu />}
        <Ventana />
    </div>
  );
};
