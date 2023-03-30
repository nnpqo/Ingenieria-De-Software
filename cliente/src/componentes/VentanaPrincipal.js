import { Menu,MenuEtiquetas } from "./Menu";
import { VentanaFormulario } from "./Ventana";
import "../estilos/app.css";
import CajaTexto from "./CajaTexto";
import { Aviso } from "./Aviso";
import { ComboBox } from "./ComboBox";
import { useState,useEffect,useContext, createContext } from "react";

export const prueba= createContext()


export const VentanaPrincipal = (props) => {
  const [ventana,setVentana]=useState(0)

  console.log(ventana)
  const etiquetas=['xiaomi','samsumg']
  const opciones=[<CajaTexto nombre={'Nombre*'}/>,<CajaTexto nombre={'descripcion*'}/>,<ComboBox nombre={'etiquetas'} opciones={etiquetas}/>]
  return (
    <div>
      <prueba.Provider value={[setVentana]}>
      {props.menu === 1 && <MenuEtiquetas /> }
      {props.menu === 2 && <Menu />}
      </prueba.Provider>

      {<VentanaFormulario titulo={'REGISTRAR PRODUCTO'} opciones={opciones}/>}
    </div>
  );
};
