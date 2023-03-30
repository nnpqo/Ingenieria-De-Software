import { Cabezera } from "./Cabecera";
import { Menu,MenuEtiquetas } from "./Menu";
import { Ventana } from "./Ventana";
import "../estilos/app.css";
import CajaTexto from "./CajaTexto";

export const VentanaPrincipal = (props) => {
  const opciones=[<CajaTexto nombre={'hola'}/>]
  return (
    <div>
      {props.menu === 1 && <MenuEtiquetas />}
      {props.menu === 2 && <Menu />}
        {<Ventana titulo={'hola'} opciones={opciones}/>}
    </div>
  );
};
