import { Route, Routes, BrowserRouter } from "react-router-dom";
import { VentanaPrincipal } from "./componentes/VentanaPrincipal";
import { Cabecera } from "./componentes/Cabecera";
import { useState } from "react";

export const Router = () => {
  const [buscar, setBuscar] = useState(false)
  
  const actualizarBusqueda = (nuevaBusqueda) => {
    setBuscar(nuevaBusqueda);
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cabecera actualizar={actualizarBusqueda}/>}>
            <Route index element={<VentanaPrincipal menu={1} busqueda={buscar}/>} />
            <Route path="productos" element={<VentanaPrincipal menu={2}  />} />
            {/*<Route path="/:id" element={<ModeloCar />}></Route>*/}
            <Route path="*" element={<h1>404 </h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
