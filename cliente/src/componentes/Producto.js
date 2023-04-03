import React from "react";
import "../estilos/producto.css"
import samsung from "../imagenes/samsung_g.jpg";

export const Producto = () =>{ 
    return (

      <div className="pantalla">
        <div className="san">
            <img className="product" src={samsung} />
            <h4 className="tittle">Samsung</h4>
            <h4 className="tittle">GALAXY Z FLIP4</h4>
        </div>
      </div>

    );
}