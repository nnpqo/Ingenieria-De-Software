import { useState } from "react";
import "../estilos/popupproducto.css";
import imgVender from "../imagenes/imgVender.svg"
import lapiz from "../imagenes/lapiz.svg"
import cruz from  "../imagenes/cruz.svg"

export const FilaProducto=(item,contador)=>{
  const [modificar, setModificar]=useState(false);
  const [comprar, setComprar] = useState(false);

  return (<tr id={item.imei} className="fila">
  <td className="ele">
    <p className="numero">{contador}</p>
  </td>
  <td className="ele">
    <input
      type="number"
      className="imei"
      value={item.imei}
      disabled
    ></input>
  </td>
  <td className="ele">
    <input className="color pre" value={item.color} disabled></input>
  </td>
  {modificar?<>
    <td>
    <button className="vender-cancelar"> ✔ </button></td>
    <td><button className="vender-cancelar">
    <img src={cruz}>
    </img> </button></td></>:comprar?<></>:
    <>
    <td className="ele" ><button className="modificar-aceptar">
    <img src={lapiz}>
    </img></button></td>
    <td className="ele"><button className="vender-cancelar">
    <img src={imgVender}>
    </img></button></td>
    </>}
</tr>)
}