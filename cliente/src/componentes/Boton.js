import Icon from "@mdi/react";
import "../estilos/boton.css";

export const Boton = (props) => {
  return (
    <buttom onClick={props.funcion} className={props.estilos}>
      <h2>
        {" "}
        <Icon path={props.ico} size={1} /> {props.nombre}
      </h2>
      <image src={props.image}></image>
    </buttom>
  );
};
