import { Route, Routes, BrowserRouter} from "react-router-dom";
import { VentanaPrincipal } from "./componentes/VentanaPrincipal";
import { Cabezera } from "./componentes/Cabecera";
export const Router = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Cabezera />}>
            <Route index element={<VentanaPrincipal menu={1}  />}/>
            <Route path="productos" element={<VentanaPrincipal menu={2} />}/>
            {/*<Route path="/:id" element={<ModeloCar />}></Route>*/}
            <Route path="*" element={<h1>404</h1>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;