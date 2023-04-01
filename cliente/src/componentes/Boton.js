import Icon from "@mdi/react";
import "../estilos/boton.css";

export const Boton = (props) => {
  return (
    <button onClick={props.funcion} className={props.estilos}>
      <h2>
        {" "}
        {props.ico !== undefined && <Icon path={props.ico} size={1} />}
        {props.nombre}
      </h2>
      <img src={props.image}></img>
    </button>
  );
};
