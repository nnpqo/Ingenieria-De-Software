import { useEffect, useState } from "react";
import { getEtiquetas } from "../API/api";
import "../estilos/app.css"

export const Categoria = () => {
  const [desplegado, setdesplegado] = useState(false);
  const [etiquetas, setEtiquetas] = useState([]);

  useEffect(()=>{
    getEtiquetas().then((nombres) => setEtiquetas(nombres));
  },[])

  let et = etiquetas?.map((eti)=>{
    return <ul>
      <Etiqueta nombre={eti}/>
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
  return (
    <>
      <input type="checkbox" name="" id="check"/>
      <span className="nombre-etiqueta">{props.nombre}</span>
    </>
  );
};
