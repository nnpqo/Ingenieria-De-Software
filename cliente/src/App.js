import { Cabezera } from "./componentes/Cabecera";
import { Menu } from "./componentes/Menu";
import { Ventana } from "./componentes/Ventana";
import "./estilos/app.css";

export const App = () => {
  return (
    <div className="body">
      <div>
        <Cabezera />
      </div>
      <div className="ventana-principal">
        <Menu />
        <Ventana />
      </div>
    </div>
  );
};
