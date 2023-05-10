import { Route, Routes, HashRouter } from "react-router-dom";
import { VentanaPrincipal } from "./componentes/VentanaPrincipal";
import { Cabecera } from "./componentes/Cabecera";
import { useState } from "react";
import { VentanaMostrarVenta } from "./componentes/VentanaMostrarVenta";
import "./estilos/index.css";
import { Login } from "./componentes/Login";

export const Router = () => {
  const [barraBusqueda,setBarraBusqueda]= useState(false)
  const [buscar, setBuscar] = useState(false)
  
  const actualizarBusqueda = (nuevaBusqueda) => {
    setBuscar(nuevaBusqueda);
  }
  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path="/" element={<Cabecera actualizar={actualizarBusqueda} barra={barraBusqueda}/>}>
            <Route path="home" element={<VentanaPrincipal menu={1} busqueda={buscar} setBarraBusqueda={setBarraBusqueda}/>} />
            <Route path="productos" element={<VentanaPrincipal menu={2} setBarraBusqueda={setBarraBusqueda} />} />
            <Route path="venta" element={<VentanaMostrarVenta />} />
            {/*<Route path="/:id" element={<ModeloCar />}></Route>*/}
            <Route path="*" element={<h1>404 </h1>} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};
export default Router;
