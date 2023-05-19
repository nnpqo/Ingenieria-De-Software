import { useState, useEffect } from "react";
import { CajaTexto } from "./CajaTexto";
import { Aviso4, Mensaje3 } from "./Aviso";
import "../estilos/VentanaNotaVenta.css"

export const VentanaNotaVenta = () => {
    const [fecha, setFecha] = useState()
    const lista = [{ ruta: "", modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "3000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "8000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "GALAXY S22", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "9000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "GALAXY A20", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "9000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "negro" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "900", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "8000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" }]
    let total = 0;
    let list = lista.map((item) => {
        total += Number(item.precio);
        return (<tr className="resultados-venta">
            <td id="resultados-1">{item.modelo}</td>
            <td id="resultados-2">{item.imei}</td>
            <td id="resultados-3">{item.precio}</td>
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
            <div className="conte-Nota">
                <div className="notaVentaIzquierda">
                    <div className="contenedor-datos">
                        <div className="datosVendedor">
                            <div className="argumento">
                            <p id="nombre-ven">Vendedor:</p>
                            <p id="resultados">Richar Parker Choque</p>
                            </div>
                            <div className="argumento">
                            <p id="nombre-ven">Fecha:</p>
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
                            regex={"/^[a-zA-Z\s]+$/"}
                        />
                        <CajaTexto
                            nombre={"Cedula de identidad o NIT*"}
                            id={"notaVentaCedula"}
                            max={12}
                            min={7}
                            regex={"/^\d+$/"}
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

                        <tbody className="lista-body">
                            {list}
                        </tbody>
                        <tfoot className="cont-to">
                            <tr className="total">
                                <div className="total-abajo">
                                <td id="nombre-ven-1" colspan="2">Total:</td>
                                </div>
                                <div className="res-abajo">
                                <td id="resultado-2">{total} Bs</td>
                                </div>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="cont-botones">
                    <Mensaje3
                        nombre="VENDER"
                        estilos={"guardar"}
                        funcion={() => {
                            console.log("hola");
                        }}
                        mensaje={"¡venta exitosa!"}
                        error={false}
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
    )
}
