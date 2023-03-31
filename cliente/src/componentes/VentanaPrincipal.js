import { Menu,MenuEtiquetas } from "./Menu";
import { VentanaFormulario,Ventana } from "./Ventana";
import "../estilos/app.css";
import CajaTexto from "./CajaTexto";
import { Aviso } from "./Aviso";
import { ComboBox } from "./ComboBox";
import { useState,useEffect,useContext, createContext } from "react";

export const prueba= createContext()


export const VentanaPrincipal = (props) => {
  const [ventana,setVentana]=useState(0)

  console.log(ventana)
  const modelos=['p30 pro','galaxy s20','redmi note 11']
  const etiquetas=['xiaomi','samsumg']
  const opcionesModificar=[<ComboBox nombre={'Modelo*'} opciones={modelos}/>,<CajaTexto nombre={'cambiar Nombre*'}/>,<CajaTexto nombre={'cambiar Descripcion*'}/>,<ComboBox nombre={'Etiquetas'} opciones={etiquetas}/>]
  const opcionesRegistro=[<CajaTexto nombre={'Nombre*'}/>,<CajaTexto nombre={'descripcion*'}/>,<ComboBox nombre={'etiquetas'} opciones={etiquetas}/>]
  return (
    <div>
       {props.menu === 1 && (
          <>
            <MenuEtiquetas />
            <Ventana modelos={modelos}/>
          </>
        )}
      <prueba.Provider value={[setVentana]}>     
      {props.menu === 2 && (
            <><Menu />
            {ventana === 0 && <VentanaFormulario titulo={'REGISTRAR PRODUCTO'} imagen={true} opciones={opcionesRegistro}/>}
            {ventana === 1 && <VentanaFormulario titulo={'MODIFICAR PRODUCTO'} imagen={true} opciones={opcionesModificar}/>}
      </>)
      }
      </prueba.Provider>

      
    </div>
  );
};
