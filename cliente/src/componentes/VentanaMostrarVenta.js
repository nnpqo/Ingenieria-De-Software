import { Boton } from "./Boton"
import samsung from "../imagenes/samsung_g.jpg";
import "../estilos/VentanaMostrarVenta.css"
import x from "../imagenes/cruz-peque.svg"
import { Link } from "react-router-dom";
import { useState } from "react";
import { Aviso,Aviso4 } from "./Aviso";
import cruz from "../imagenes/cruz-peque.svg";
export const VentanaMostrarVenta = () => {
    const [lista, setLista] = useState([{ ruta: "", modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012345, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012301, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012302, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012303, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012304, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012305, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012306, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012307, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012308, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012309, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012310, color: "blanco" },
    { modelo: "IPHONE 13 PRO MAX", precio: "90000", marca: "APPLE", imei: 123456789012311, color: "blanco" }])
    
    let total = 0;
    let list = lista.map((item) => {
        total += Number(item.precio);
        return (
            <div id={item.imei} className="fila">
                <div className="contenedor-img">
                    <img className="imagen-venta" src={samsung} />
                </div>
                <div className="contenedor-mm">
                    <div className="modelo-venta">
                        <p id="dato">MODELO:</p>
                        <p id="argumento">{item.modelo}</p>
                    </div>
                    <div className="marca-venta">
                        <p id="dato">MARCA:</p>
                        <p id="argumento">{item.marca}</p>
                    </div>
                </div>
                <div className="contenedor-ic">
                    <div className="contenedor-imei">
                        <p id="dato">IMEI:</p>
                        <p id="argumento">{item.imei}</p>
                    </div>
                    <div className="contenedor-color">
                        <p id="dato">COLOR:</p>
                        <p id="argumento">{item.color}</p>
                    </div>
                </div>
                <div className="contenedor-precio">
                    <p id="dato">PRECIO:</p>
                    <p id="ar-precio">{item.precio}</p>
                </div>
                <div className="contenedor-cruz">
                    <Aviso
                        trigger={<button className={"cruzVenta"}>
                            <img src={cruz}></img>
                        </button>}
                        mensaje={"¿Está seguro de eliminar el producto?"}
                        bt1Nombre={"Sí"}
                        bt1Estilo={"botonSi"}
                        bt2Nombre={"NO"}
                        bt2Estilo={"botonNo"}
                        bt1Funcion={() => {
                            setLista(
                                lista.filter((elemento) => elemento.imei !== item.imei)
                            );
                        }}
                    />

                </div>
            </div>
        )
    })
    return (
        <div id="ventanaVenta">
            <p className="direccion" >Home&gt;Venta</p>
            <div className="titulo-Ventana">
                <h1>VENTA DE PRODUCTO</h1>
            </div>

            {lista.length > 0 ? (
                <div className="contenido">
                    <div className="listaVenta">
                        {list}
                    </div>
                    <div className="parteIzq">
                        <div className="seguir-venta">
                            <Link to="/home">
                                <Boton nombre="SEGUIR VENDIENDO"
                                    estilos="guardar"
                                />
                            </Link>
                        </div>
                        <div className="contenedor-total">
                            <div className="superior">
                                <p id="dato">TOTAL:</p>
                                <p id="ar-precio">{lista.length} productos</p>
                                <p id="ar-precio">{total}</p>
                            </div>
                            <div className="inferior">
                                <Link to="/NotaVenta">
                                    <Boton nombre="NOTA DE VENTA"
                                        estilos="guardar"
                                    />
                                </Link>
                                <Aviso4
                                    nombre="LIMPIAR"
                                    mensaje="¿Está seguro de eliminar todos los productos?"
                                    estilos={"cancelar"}
                                    bt1Nombre={"Sí"}
                                    bt1Estilo={"botonSi"}
                                    bt1Funcion={()=>{setLista([])}}
                                    bt2Nombre={"No"}
                                    bt2Estilo={"botonNo"}
                                />
                                {/*<Boton nombre="LIMPIAR"
                                    estilos="cancelar"
                                    funcion={() => { setLista([]) }}
                                />*/}
                            </div>
                        </div>
                    </div>
                </div>) : (<VentaVacia />)
            }
        </div>
    )
}

const VentaVacia = () => {
    return (
        <div id="container">

            <div class="face2">
                <div class="eye"></div>
                <div class="eye right"></div>
                <div class="mouth sad"></div>
            </div>
            <div className="redondo">
                <div class="shadow move"></div>
            </div>
            <div className="inf">
                <p>NO HAY PRODUCTOS SELECCIONADOS A LA VENTA</p>
            </div>
        </div>

    )
}
