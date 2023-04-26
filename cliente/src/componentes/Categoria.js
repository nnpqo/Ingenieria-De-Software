import { useEffect, useState } from "react";
import { getEtiquetas } from "../API/api";
import "../estilos/app.css";
import logo from "../imagenes/iconoAgregar.svg";
import { Aviso, AvisoEti, eliminar } from "./Aviso";
import { CajaTexto, TextArea } from "./CajaTexto";

export const Categoria = (props) => {
  const [desplegado, setdesplegado] = useState(false);
  const [etiquetas, setEtiquetas] = useState([]);

  useEffect(() => {
    const etiquetas = async () => {
      await getEtiquetas().then((nombres) => setEtiquetas(nombres));
    };
    etiquetas();
  }, []);

  let et = etiquetas?.map((eti) => {
    return (
      <ul>
        <Etiqueta
          nombre={eti}
          checked={"checkbox"}
          isChecked={false}
          handleCheckboxSelection={props.manejarSelecciónSelection}
        />
      </ul>
    );
  });

  return (
    <div className="categoria">
      <span className="dispositivosMoviles">
        <a
          onClick={() => {
            setdesplegado(!desplegado);
          }}
          className="Dispositivos"
        >
          Dispositivos móviles
        </a>
        <AvisoEti
          trigger={iconoAgregar()}
          titulo="AGREGAR ETIQUETA"
          bt1Nombre={"Guardar"}
          bt1Estilo={"guardar"}
          bt1Funcion={() => eliminar(props.nombre)}
          bt2Nombre={"Cancelar"}
          bt2Estilo={"cancelar"}
        />
      </span>
      {/* <div className={desplegado ? "etiquetas-visible" : "etiquetas"} >
        <div className="contenedor-seleccionar">
        <input type="checkbox" id="all" className="checkbox" onChange={chackeAll}></input>
        <label for="all" className="Seleccionar">Seleccionar todos</label>
        </div>
      </div> */}
      <li className={desplegado ? "etiquetas-visible" : "etiquetas"}>{et}</li>
    </div>
  );
};
const Etiqueta = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange() {
    setIsChecked(!isChecked);
    props.handleCheckboxSelection(props.nombre, !isChecked);
  }

  useEffect(() => {
    setIsChecked(props.isChecked);
  }, [props.isChecked]);

  return (
    <>
      <input
        type="checkbox"
        className={props.checked}
        id={props.nombre}
        checked={isChecked}
        onChange={handleChange}
      />
      <label for={props.nombre} className="nombre-etiqueta">
        {props.nombre}
      </label>
    </>
  );
};
const iconoAgregar = () => {
  return (
    <button className="icono-agregar">
      <img src={logo}></img>
    </button>
  );
};
const chackeAll = () => {
  let all = document.getElementById("all");
  console.log(all.checked);
  let etiquetas = document.getElementsByClassName("checkbox");
  console.log(etiquetas);
  if (all.checked) {
    Array.from(etiquetas).map((item) => {
      item.checked = true;
      item.dispatchEvent(new Event("change", { bubbles: true }));
      console.log(item);
    });
    etiquetas.checked = true;
    //etiquetas.onChange()
  } else {
    Array.from(etiquetas).map((item) => {
      item.checked = false;
      item.dispatchEvent(new Event("change", { bubbles: true }));
      console.log(item);
    });
  }
};
