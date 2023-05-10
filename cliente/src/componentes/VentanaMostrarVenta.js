import { Boton } from "./Boton"
import samsung from "../imagenes/samsung_g.jpg";
export const VentanaMostrarVenta = () => {
    const lista = [{ruta:"",modelo:"IPHONE 13 PRO MAX", precio:"90000", marca:"APPLE", imei: 123456789012345, color: "blanco" },
    {modelo:"IPHONE 13 PRO MAX", precio:"90000", marca:"APPLE", imei: 123456789012345, color: "blanco" },
    {modelo:"IPHONE 13 PRO MAX", precio:"90000", marca:"APPLE", imei: 123456789012345, color: "blanco" },
    {modelo:"IPHONE 13 PRO MAX", precio:"90000", marca:"APPLE", imei: 123456789012345, color: "blanco" }]
    let total=0;
    let list = lista.map((item) => {
        total += Number(item.precio);
        return (
            
        <div id={item.imei} className="fila">
            <img  src={samsung} />
            <p>MODELO:</p>
            <p >{item.modelo}</p>
            <p>MARCA:</p>
            <p >{item.marca}</p>
            <p>IMEI:</p>
            <p >{item.imei}</p>
            <p>COLOR:</p>
            <p >{item.color}</p>
            <p>PRECIO:</p>
            <p >{item.precio}</p>
        </div>
        )
    })
    return (
        <div id="ventanaVenta">
            <p className="direccion" >Home&gt;Venta</p>
            <div className="titulo-Ventana">
                <h1>VENTA DE PRODUCTO</h1>
            </div>
            <Boton nombre="SEGUIR VENDIENDO"
            estilos="guardar"
            />
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
                <p>TOTAL:</p>
                <p >{total}</p>
            </div>



        </div>
    )
}