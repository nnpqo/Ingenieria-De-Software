import { useEffect, useState } from "react";

export const Categoria = () => {
  const [desplegado, setdesplegado] = useState(false);
  return (
    <div>
      <li>
        <ul>
          <p
            onClick={() => {
              setdesplegado(!desplegado);
            }}
          >
            dispositivos moviles
          </p>
          <li className={desplegado ? "etiquetas-visible" : "etiquetas"}>
            <ul>
              <Etiqueta nombre={"samsumg"} />
            </ul>
            <ul>
              <Etiqueta nombre={"xiaomi"} />
            </ul>
            <ul>
              <Etiqueta nombre={"lg"} />
            </ul>
          </li>
        </ul>
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

function desplegar() {}
