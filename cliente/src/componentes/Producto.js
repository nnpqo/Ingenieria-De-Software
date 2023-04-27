import React from "react";
import "../estilos/producto.css";
import { Aviso, eliminar } from "./Aviso";
import { Popupproducto } from "./Popupproducto";
import samsung from "../imagenes/samsung_g.jpg";

import { eliminarProducto } from "../API/productos";


export const Producto = (props) => {
  const ruta = "http://localhost:3001" + props.ruta;
 // console.log(ruta);
  return (
    <Popupproducto
      trigger={
        <div className="pantalla" id={props.nombre}>
          <div
            // onClick={(props, ruta) => {
            //   mostrarmodelo(props, ruta);
            // }}
            className="san">
            <Aviso
              trigger={Basurero()}
              mensaje="¿Está seguro de eliminar este modelo de dispositivo?"
              bt1Nombre={"Si"}
              bt1Estilo={"botonSi"}
              bt1Funcion={() => {
                const elProducto = new Promise((resolve, reject) => {
                  const result = eliminarProducto(props.id);
                  resolve(result);
                });
                elProducto.then(result => result)
                props.funActualizar(!props.cambioVisible);
              }}
              bt2Nombre={"No"}
              bt2Estilo={"botonNo"}
            />
            <img className="product" src={ruta} />
            <h4 className="tittle">{props.etiqueta}</h4>
            <h4 className="tittle">{props.nombre}</h4>
  
          </div>
        </div>
      }
      //here
      ruta={ruta}
      etiqueta={props.etiqueta}
      caracteristicas={props.caracteristicas}
      nombre={props.nombre}
      precio={props.precio}
    />
  );
};


// const mostrarmodelo = (props, ruta) => {
//   console.log("1");
//   return (
//     <Popupproducto trigger
//       style="position:fixed"
//       etiqueta={props.etiqueta}
//       nombre={props.nombre}
//       ruta={ruta}
//       caracteristicas={"caracteristicas del telefono"}
//       precio={"00123"}
//     />
//   );
// };
const Basurero = () => {
  return (
    <button className="color">
      <div className="eliminar">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V6H17H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V8H5C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6H7H9V5ZM10 8H8V18C8 18.5523 8.44772 19 9 19H15C15.5523 19 16 18.5523 16 18V8H14H10ZM13 6H11V5H13V6ZM10 9C10.5523 9 11 9.44772 11 10V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V10C9 9.44772 9.44772 9 10 9ZM14 9C14.5523 9 15 9.44772 15 10V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V10C13 9.44772 13.4477 9 14 9Z"
              fill="#ffffff"
            ></path>{" "}
          </g>
        </svg>
      </div>
    </button>
  );
};
