import { useState, useEffect, useContext } from "react";
import { CajaTexto } from "./CajaTexto";
import { Aviso4, AvisoConfirmacion } from "./Aviso";
import "../estilos/VentanaNotaVenta.css";
import { Context } from "../Context/Context";
import { vender } from "../API/productos";
import { inputArtificial } from "./Ventana";
import { Navigate, useNavigate } from 'react-router-dom';
import openDatabase ,{ getElementos } from "../API/IndexDB";

export const VentanaNotaVenta = () => {
  const navigate = useNavigate()
  const [fecha, setFecha] = useState();
  const { listaVenta, setListaVenta } = useContext(Context);
  const [status, setStatus] = useState({ message: "", error: false });

  useEffect(() => {
    openDatabase();
    getElementos().then(res => {
      console.log(res);
      setListaVenta(res)});
  }, []);

  let total = 0;
  let list = listaVenta.map((item) => {
    total += Number(item.precio);
    return (
      <tr className="resultados-venta">
        <td id="resultados-1">{item.modelo}</td>
        <td id="resultados-2">{item.imei}</td>
        <td id="resultados-3">{item.precio}</td>
      </tr>
    );
  });

  const completarVenta = async () => {
    await listaVenta.map((item) => {
      vender(item.id);
    });
  };

  useEffect(() => {
    const obtenerFecha = () => {
      const now = new Date();
      const dia = now.getDate().toString().padStart(2, "0");
      const mes = (now.getMonth() + 1).toString().padStart(2, "0");
      const año = now.getFullYear();
      const fechaActual = `${dia}/${mes}/${año}`;
      setFecha(fechaActual);
    };
    obtenerFecha();
  }, []);

  return (
    <div id="ventanaVenta">
      <p className="direccion">Home&gt;Venta&gt;Nota de venta</p>
      <div className="titulo-Ventana">
        <h1>NOTA DE VENTA</h1>
      </div>
      <div className="conte-Nota">
        <div className="notaVentaIzquierda">
          <div className="contenedor-datos">
            <div className="datosVendedor">
              <div className="argumento">
                <p id="nombre-ven">Vendedor:</p>
                <p id="nombre-ven">Fecha: </p>
              </div>
              <div className="argumentoFecha">
                <p id="resultados">Kevin Huanca Mejia</p>
                <p id="resultados">{fecha}</p>
              </div>
            </div>
          </div>
          <div className="inputsNotaVenta">
            <CajaTexto
              nombre={"Cliente*"}
              id={"notaVenta"}
              max={50}
              min={0}
              regex={"/^[a-zA-Zs]+$/"}
            />
            <CajaTexto
              nombre={"Cedula de identidad o NIT*"}
              id={"notaVentaCedula"}
              max={12}
              min={7}
              regex={"/^d+$/"}
            />
          </div>
        </div>
        <div className="notaVentaDerecha">
          <table className="tabla">
            <tr className="contenedor-titulos">
              <th id="titulo-producto">PRODUCTO</th>
              <th id="titulo-imei">IMEI</th>
              <th id="titulo-importe">IMPORTE en Bs</th>
            </tr>

            <tbody className="lista-body">{list}</tbody>
            <tfoot className="cont-to">
              <tr className="total">
                <div className="total-abajo">
                  <td id="nombre-ven-1" colspan="2">
                    Total:
                  </td>
                </div>
                <div className="res-abajo">
                  <td id="resultado-2">{total} Bs</td>
                </div>
              </tr> 
            </tfoot>
          </table>
          <div className="cont-botones">
            <AvisoConfirmacion //antes estaba con mensaje3
              nombre="VENDER"
              estilos={"guardar"}
              mensaje="¿Está seguro de realizar la venta?"
              bt1Nombre={"Sí"}
              bt1Estilo={"botonSi"}
              bt2Nombre={"No"}
              bt2Estilo={"botonNo"}
              funcion={() => {
                if (
                  document.getElementById("notaVenta").value === "" ||
                  document.getElementById("notaVentaCedula").value === ""
                ) {
                  inputArtificial();
                  setStatus({ message: "Error al vender", error: true });
                } else {
                  completarVenta().then((result) => {
                    setStatus({ message: "¡Venta exitosa!", error: false });
                    setListaVenta([]);
                    setTimeout(()=>{
                        navigate("/")
                    },2000)
                  });

                }
              }}
              mensaje2={status.message}
              error={status.error}
            
            />
            <Aviso4
              nombre="CANCELAR"
              mensaje="¿Está seguro de cancelar la venta?"
              estilos={"cancelar"}
              bt1Nombre={"Sí"}
              bt1Estilo={"botonSi"}
              bt1Funcion={console.log("hola")}
              bt2Nombre={"No"}
              bt2Estilo={"botonNo"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
