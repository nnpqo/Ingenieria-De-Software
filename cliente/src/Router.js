import { Route, Routes, HashRouter,BrowserRouter,Navigate } from "react-router-dom";
import { VentanaPrincipal } from "./componentes/VentanaPrincipal";
import { Cabecera } from "./componentes/Cabecera";
import { useState } from "react";
import { VentanaMostrarVenta } from "./componentes/VentanaMostrarVenta";
import "./estilos/index.css";
import { ContextProvider } from "./Context/Context";
import { Login } from "./componentes/Login";
import { VentanaNotaVenta } from "./componentes/VentanaNotaVenta";
localStorage.setItem("intentos", 3);

export const Router = () => {
  const [barraBusqueda,setBarraBusqueda]= useState(false)
  const [buscar, setBuscar] = useState(false)
  const [logueado,setLogueado]= useState(false)
  
  const token = localStorage.getItem('token');
  
  const actualizarBusqueda = (nuevaBusqueda) => {
    setBuscar(nuevaBusqueda);
  }
  return (
    <>
      <HashRouter>
        <ContextProvider>
        <Routes>
          <Route path="/login" element={logueado || token ? ( <Navigate to="/"/>): (<Login logueado={logueado} setLogueado={setLogueado}/>)}/>
          <Route path="/" element={logueado || token ?(<Cabecera actualizar={actualizarBusqueda} barra={barraBusqueda}/>):( <Navigate to="/login"/>)}>
            <Route path="/" element={<VentanaPrincipal menu={1} busqueda={buscar} setBarraBusqueda={setBarraBusqueda}/>} />
            <Route path="/productos" element={<VentanaPrincipal menu={2} setBarraBusqueda={setBarraBusqueda} />} />
            <Route path="/venta" element={<VentanaMostrarVenta />} />
            <Route path="/NotaVenta" element={<VentanaNotaVenta />} />
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
