import { Menu, MenuEtiquetas } from "./Menu";
import { VentanaFormulario, Ventana } from "./Ventana";
import "../estilos/app.css";
import CajaTexto from "./CajaTexto";
import { Aviso } from "./Aviso";
import { ComboBox } from "./ComboBox";
import { useState, useEffect, useContext, createContext } from "react";
import { Producto } from "./Producto";

export const prueba = createContext();

export const VentanaPrincipal = (props) => {
  const [guardar, setGuardar] = useState(false);
  const [ventana, setVentana] = useState(0);
  const [checkboxesSeleccionados, setCheckboxesSeleccionados] = useState([]);
  
 /* useEffect(()=>{

  },[])*/

  function manejarSelecciónSelection(nombre, isChecked) {
    console.log(nombre+isChecked)
    if (isChecked) {
      setCheckboxesSeleccionados([...checkboxesSeleccionados, nombre]);
    } else {
      setCheckboxesSeleccionados(
        checkboxesSeleccionados.filter((n) => n !== nombre)
      );
    }
    console.log(checkboxesSeleccionados);
  }

  return (
    <prueba.Provider value={[setVentana, guardar, setGuardar,setCheckboxesSeleccionados]}>
      <div className="ventana-principal">
        {props.menu === 1 && (
          <>
            {props.setBarraBusqueda(true)}
            <MenuEtiquetas
              manejarSelecciónSelection={manejarSelecciónSelection}
            />
            <Ventana lista={checkboxesSeleccionados} busqueda={props.busqueda}/>
          </>
        )}
          {/* <div className="botonpopup">
            <Boton>Popup</Boton>
          </div> */}
        {props.menu === 2 && (
          <>
            {props.setBarraBusqueda(false)}
            <Menu />
            {ventana === 0 && (
              <VentanaFormulario
                titulo={<>{"REGISTRAR"} {"DISPOSITIVO"}</>}
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
     
      </div>
    </prueba.Provider>
  );
};
