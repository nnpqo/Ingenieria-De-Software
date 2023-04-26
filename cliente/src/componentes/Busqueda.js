import { useState } from "react";

export const Busqueda = (props) => {
    const [buscar, setBuscar] = useState(false)
  return (
    <div className={props.visible ? "barra-buscar" : "buscar-no-visible"}>
      <input
        type="text"
        class="estilo-input"
        placeholder="Buscar"
        id="buscar"
      ></input>
      <button class="contenedor-icono" onClick={() => {
        setBuscar(!buscar);
        props.actualizar(buscar)
        
      }}></button>
    </div>
  );
};
