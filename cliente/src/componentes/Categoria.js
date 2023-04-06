import { useEffect, useState } from "react";

export const Categoria = () => {
  const [desplegado, setdesplegado] = useState(false);
  const etiquetas = [<ul><Etiqueta nombre={"Samsumg"} /></ul>,<ul> <Etiqueta nombre={"Xiaomi"}/> </ul>,<ul>  <Etiqueta nombre={"Lg"}  /></ul>];
  return (
    <div className="categoria">
          <span className="dispositivosMoviles">
            <a onClick={() => {
              setdesplegado(!desplegado);
            }}>
              Dispositivos móviles
            </a>
          </span>
          <li className={desplegado ? "etiquetas-visible" : "etiquetas"}>
            {etiquetas}
          </li>
    </div>
  );
};
const Etiqueta = (props) => {
  return (
    <>
      <input type="checkbox" name="" />
      <span>{props.nombre}</span>
    </>
  );
};

