import { Cabecera } from "./componentes/Cabecera";
import { Menu } from "./componentes/Menu";
import { Ventana } from "./componentes/Ventana";
import "./estilos/app.css";

export const App = () => {
  return (
    <div className="body">
      <div>
        <Cabecera />
      </div>
      <div className="ventana-principal">
        <Menu />
        <Ventana />
      </div>
    </div>
  );
};
