import { useEffect, useState } from "react";
import logo from "../imagenes/cruz-pequena.svg";
import search from "../imagenes/search.svg";

export const Busqueda = (props) => {
  const [buscar, setBuscar] = useState(false);
  return (
    <div className="buscar-contenedor">
    <div className={props.visible ? "barra-buscar" : "buscar-no-visible"}>
      <input
        type="text"
        class="estilo-input"
        placeholder="Buscar"
        id="buscar"
        onKeyUp={() => {
          enterBusqueda(props, buscar, setBuscar);
          eliminarEspacio();
        }}
      ></input>

      <button
        id="boton-X"
        onClick={() => {
          eliminarBusqueda(props, buscar, setBuscar);
        }}
      >
        <img classname="icon-close" src={logo}></img>
      </button>
      <button
        class="contenedor-icono"
        onClick={() => {
          setBuscar(!buscar);
          props.actualizar(buscar);
          buscarAll();
        }}
      >
        <img className="busqueda-icon" src={search}></img>
      </button>
    </div>
    </div>
  );
};
const eliminarEspacio = () => {
  const input = document.getElementById("buscar");
  const value = input.value;
  if (value.length > 0 && value[0] === " ") {
    input.value = value.slice(1);
  }
};
const eliminarBusqueda = (props, buscar, setBuscar) => {
  const input = document.getElementById("buscar");
  input.value = "";
  setBuscar(!buscar);
  props.actualizar(buscar);
};

const enterBusqueda = (props, buscar, setBuscar) => {
  const input = document.getElementById("buscar");
  if (input != null) {
    input.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        setBuscar(!buscar);
        props.actualizar(buscar);
        buscarAll();
      }
    });
  }
};
const buscarAll = () => {
  const checkbox = document.getElementById("all");
  checkbox.checked = true;

  const event = new Event("change");
  checkbox.dispatchEvent(event);
};
