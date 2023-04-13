import { useEffect, useState } from "react";
import { getEtiquetas } from "../API/api";
import "../estilos/app.css"

export const Categoria = (props) => {
  const [desplegado, setdesplegado] = useState(false);
  const [etiquetas, setEtiquetas] = useState([]);
 

  useEffect(()=>{
    const etiquetas = async () => {
      await getEtiquetas().then((nombres) => setEtiquetas(nombres));}
    etiquetas();
  },[])


  let et = etiquetas?.map((eti)=>{
    return <ul>
      <Etiqueta nombre={eti}
      isChecked={false}
      handleCheckboxSelection={props.manejarSelecciónSelection}/>
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
      className="checkbox"
      id="check"
      checked={isChecked}
      onChange={handleChange}/>
      <span className="nombre-etiqueta">{props.nombre}</span>
    </>
  );
};
