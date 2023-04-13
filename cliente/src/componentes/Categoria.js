import { useEffect, useState } from "react";
import { getEtiquetas } from "../API/api";
import "../estilos/app.css"

export const Categoria = () => {
  const [desplegado, setdesplegado] = useState(false);
  const [etiquetas, setEtiquetas] = useState([]);
  const [checkboxesSeleccionados, setCheckboxesSeleccionados] = useState([]);


  useEffect(()=>{
    getEtiquetas().then((nombres) => setEtiquetas(nombres));
    console.log(checkboxesSeleccionados)
    
  },[setCheckboxesSeleccionados])

  function manejarSelecciónSelection(nombre, isChecked) {
    if (isChecked) {
      setCheckboxesSeleccionados([...checkboxesSeleccionados, nombre]);
    } else {
      setCheckboxesSeleccionados(
        checkboxesSeleccionados.filter((n) => n !== nombre)
      );
    }
    console.log(checkboxesSeleccionados)
  }

  let et = etiquetas?.map((eti)=>{
    return <ul>
      <Etiqueta nombre={eti}
      isChecked={checkboxesSeleccionados.includes(eti)}
      handleCheckboxSelection={manejarSelecciónSelection}/>
    </ul>
  })
 
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
      </span>
      <li className={desplegado ? "etiquetas-visible" : "etiquetas"}>
        {et}
      </li>
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
      <input type="checkbox" 
      name={props.nombre} 
      id="check"
      checked={isChecked}
      onChange={handleChange}/>
      <span className="nombre-etiqueta">{props.nombre}</span>
    </>
  );
};
