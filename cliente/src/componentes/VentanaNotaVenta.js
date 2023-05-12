import { useState, useEffect } from "react";
import { CajaTexto } from "./CajaTexto";
import { Boton } from "./Boton";

export const VentanaNotaVenta = () => {
    const [fecha, setFecha] = useState()
    const lista = [{ ruta: "", modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" }]
    let total = 0;
    let list = lista.map((item) => {
        total += Number(item.precio);
        return (<tr>
            <td>{item.modelo}</td>
            <td>{item.imei}</td>
            <td>{item.precio}</td>
        </tr>
        )
    })

    useEffect(() => {
        const obtenerFecha = () => {
            const now = new Date();
            const dia = now.getDate().toString().padStart(2, '0');
            const mes = (now.getMonth() + 1).toString().padStart(2, '0');
            const año = now.getFullYear();
            const fechaActual = `${dia}/${mes}/${año}`;
            setFecha(fechaActual);
        }
        obtenerFecha();
    }, [])

    return (
        <div id="ventanaVenta">
            <p className="direccion" >Home&gt;Venta&gt;Nota de venta</p>
            <div className="titulo-Ventana">
                <h1>NOTA DE VENTA</h1>
            </div>
            <div className="notaVentaIzquierda">
                <div className="datosVendedor">
                    <p>Vendedor:</p>
                    <p>Richar Parker Choque</p>
                    <p>Fecha:</p>
                    <p>{fecha}</p>
                </div>
                <div className="inputsNotaVenta">
                    <CajaTexto
                        nombre={"Cliente*"}
                        id={"precio"} />
                    <CajaTexto
                        nombre={"Cedula de identidad o NIT*"}
                        id={"precio"} />
                </div>
            </div>
            <div className="notaVentaDerecha">
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>IMEI</th>
                            <th>IMPORTE en Bs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2">Total:</td>
                            <td>{total} Bs</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="botonesNotaVenta">
                    <Boton nombre= {"VENDER"}
                    estilos="guardar"/>
                    <Boton nombre= {"CANCELAR"}
                    estilos="cancelar"/>
                </div>
            </div>

        </div>
    )
}