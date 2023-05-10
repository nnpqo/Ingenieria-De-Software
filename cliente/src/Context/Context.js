import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [buscar , setBuscar] = useState(false);
    const [visible, setVisible] = useState(false);
  const datos = {buscar, setBuscar, visible, setVisible};
  return <Context.Provider value={datos}>{children}</Context.Provider>;
};

export { ContextProvider, Context };

