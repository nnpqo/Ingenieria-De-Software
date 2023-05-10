import { Route, Routes, HashRouter } from "react-router-dom";
import { VentanaPrincipal } from "./componentes/VentanaPrincipal";
import { Cabecera } from "./componentes/Cabecera";
import { useState } from "react";
import "./estilos/index.css";
import { ContextProvider } from "./Context/Context";

export const Router = () => {
  const [barraBusqueda,setBarraBusqueda]= useState(false)
  const [buscar, setBuscar] = useState(false)
  
  const actualizarBusqueda = (nuevaBusqueda) => {
    setBuscar(nuevaBusqueda);
  }
  return (
    <>
      <HashRouter>
        <ContextProvider>
        <Routes>
          <Route path="/" element={<Cabecera actualizar={actualizarBusqueda} barra={barraBusqueda}/>}>
            <Route index element={<VentanaPrincipal menu={1} busqueda={buscar} setBarraBusqueda={setBarraBusqueda}/>} />
            <Route path="productos" element={<VentanaPrincipal menu={2} setBarraBusqueda={setBarraBusqueda} />} />
            {/*<Route path="/:id" element={<ModeloCar />}></Route>*/}
            <Route path="*" element={<h1>404 </h1>} />
          </Route>
        </Routes>
        </ContextProvider>
      </HashRouter>
    </>
  );
};
export default Router;
