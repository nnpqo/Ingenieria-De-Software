import { createContext, useEffect, useState } from "react";
import openDatabase ,{ getElementos } from "../API/IndexDB";

const Context = createContext();



const ContextProvider = ({ children }) => {
  const [buscar, setBuscar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkboxesSeleccionados, setCheckboxesSeleccionados] = useState([]);
  const [listaVenta,setListaVenta]=useState([])
 
  useEffect(() => {
    openDatabase();
    getElementos().then(res => {setListaVenta(res)})
  }, []);

  const datos = {
    buscar,
    setBuscar,
    visible,
    setVisible,
    checkboxesSeleccionados,
    setCheckboxesSeleccionados,
    listaVenta,
    setListaVenta
  };
  return <Context.Provider value={datos}>{children}</Context.Provider>;
};

export { ContextProvider, Context };
