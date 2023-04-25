import { useEffect, useState } from "react";
import { getEtiquetas } from "../API/api";
import "../estilos/app.css";
import logo from "../imagenes/iconoAgregar.svg";
import { Aviso,AvisoEti,eliminar } from "./Aviso";
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
        >
          Dispositivos móviles
        </a>
        <AvisoEti trigger={iconoAgregar()}
          titulo="AGREGAR ETIQUETA"
          extra={<div className="cajita"><CajaTexto 
            nombre={"Nombre de etiqueta*"}
            id2={"tex"}
            id={"etiquetaFormulario"}
            min={2}
            max={20}
            regex={"[ a-zA-Z0-9]+"}
          /></div>}
          bt1Nombre={"Guardar"}
          bt1Estilo={"guardar"}
          bt1Funcion={() => eliminar(props.nombre)}
          bt2Nombre={"Cancelar"}
          bt2Estilo={"cancelar"} />
      </span>
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
const iconoAgregar=()=>{
  return(
    <button className="icono-agregar">
        <img src={logo}></img>
        </button>
  )
}