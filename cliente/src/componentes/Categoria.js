import { useEffect, useState } from "react";
import { getEtiquetas } from "../API/api";
import "../estilos/app.css";
import logo from "../imagenes/iconoAgregar.svg";
import { Aviso, AvisoEti, eliminar } from "./Aviso";
import { CajaTexto, TextArea } from "./CajaTexto";
import {agregarEtiqueta} from "../API/etiquetas"

export const Categoria = (props) => {
  const [desplegado, setdesplegado] = useState(false);
  const [etiquetas, setEtiquetas] = useState([]);
  const [nuevaEti,setNuevaEti]=useState(false)

  useEffect(() => {
    const etiquetas = async () => {
      await getEtiquetas().then((nombres) => setEtiquetas(nombres));
    };
    etiquetas();
  }, [nuevaEti]);

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
          bt1Funcion={()=>{guardarEtiqueta();
            nuevaEti? setNuevaEti(false):setNuevaEti(true)}}
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


const guardarEtiqueta = async () => {
  let valor = document.getElementById("etiquetaFormulario");
  console.log("agregar etiqueta" + valor.value);
  try {
    await agregarEtiqueta(valor.value);
  } catch (error) {
    console.log(error);
  }
};

