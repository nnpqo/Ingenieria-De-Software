import Icon from "@mdi/react";

export const Boton = (props) => {
  return (
    <buttom onClick={props.funcion}>
        <h2>{props.nombre}</h2>
        <Icon path={props.ico} size={1}/>
        <image src={props.image}></image>
    </buttom>
  );
};
