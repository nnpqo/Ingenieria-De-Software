import { Menu, MenuEtiquetas } from "./Menu";
import { VentanaFormulario, Ventana } from "./Ventana";
import "../estilos/app.css";
import CajaTexto from "./CajaTexto";
import { Aviso } from "./Aviso";
import { ComboBox } from "./ComboBox";
import { useState, useEffect, useContext, createContext } from "react";
import {Producto} from "./Producto";


export const prueba = createContext();

export const VentanaPrincipal = (props) => {
  const [ventana, setVentana] = useState(0);

  console.log(ventana);
  
  return (
    <div className="ventana-principal">
      {props.menu === 1 && (
        <>
          <MenuEtiquetas />
          <Ventana />
        </>
      )}
      <prueba.Provider value={[setVentana]}>
        {props.menu === 2 && (
          <>
            <Menu />
            {ventana === 0 && (
              <VentanaFormulario
                titulo={"REGISTRAR MODELO DE DISPOSITIVO MOVIL"}
                imagen={true}
                tipo={"registro"}
              />
            )}
            {ventana === 1 && (
              <VentanaFormulario
                titulo={"MODIFICAR DISPOSITIVO"}
                imagen={true}
                tipo={"modificar"}
              />
            )}
          </>
        )}
      </prueba.Provider>
      
    </div>
  );
};
