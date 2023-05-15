import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [buscar, setBuscar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkboxesSeleccionados, setCheckboxesSeleccionados] = useState([]);
  const datos = {
    buscar,
    setBuscar,
    visible,
    setVisible,
    checkboxesSeleccionados,
    setCheckboxesSeleccionados,
  };
  return <Context.Provider value={datos}>{children}</Context.Provider>;
};

export { ContextProvider, Context };
