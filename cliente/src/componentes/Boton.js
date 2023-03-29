import Icon from "@mdi/react";
import { mdiArchiveOutline } from "@mdi/js";

export const Boton = (props) => {
  return (
    <buttom>
        <h2>{props.nombre}</h2>
        <>{props.ico}</>
    </buttom>
  );
};
