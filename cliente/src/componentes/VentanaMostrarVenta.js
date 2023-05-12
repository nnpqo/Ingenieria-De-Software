import { Boton } from "./Boton"
import samsung from "../imagenes/samsung_g.jpg";
import "../estilos/VentanaMostrarVenta.css"
import x from "../imagenes/cruz-peque.svg"
export const VentanaMostrarVenta = () => {
    const lista = [{ruta:"",modelo:"IPHONE 13 PRO MAX", precio:"90000", marca:"APPLE", imei: 123456789012345, color: "blanco" },
    {modelo:"IPHONE 13 PRO MAX", precio:"90000", marca:"APPLE", imei: 123456789012345, color: "blanco" },
    {modelo:"IPHONE 13 PRO MAX", precio:"90000", marca:"APPLE", imei: 123456789012345, color: "blanco" }]
    let total=0;
    let list = lista.map((item) => {
        total += Number(item.precio);
        return (  
        <div id={item.imei} className="fila">
            <div className="contenedor-img">
            <img className="imagen-venta"  src={samsung} />
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
        </div>
        )
    })
    return (
        <div id="ventanaVenta">
            <p className="direccion" >Home&gt;Venta</p>
            <div className="titulo-Ventana">
                <h1>VENTA DE PRODUCTO</h1>
            </div>
            <div className="seguir-venta">
            <Boton nombre="SEGUIR VENDIENDO"
            estilos="guardar"
            />
            </div>
            <div className="listaVenta">
                {list}
            </div>
            <div className="parteBaja">
                <Boton nombre="NOTA DE VENTA"
                estilos="guardar"
                />
                <Boton nombre="LIMPIAR"
                estilos="cancelar"
                />
                <div className="contenedor-total">
                <p id="dato">TOTAL:</p>
                <p id="ar-precio">{total}</p>
                </div>
            </div>
        </div>
    )
}