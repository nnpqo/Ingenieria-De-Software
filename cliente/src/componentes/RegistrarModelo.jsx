import React from "react";
const RegistrarModelo =()=>{
    return(
        <div>
            <p>REGISTRAR MODELO DE DISPOSITIVO</p>
            <form>
                <div id="huImagen">

                </div>
                <p>Nombre</p>
                <input type="Text" required minLength="2" maxLength="30" pattern="^[A-Z]+$" />
                <p>Descripcion</p>
                <input type="Text"required minLength="10" maxLength="200"/>
                <p>Etiquetas</p>
                <select id="SelectEtiquetas">
                    <option value='Apple'>Apple</option>
                    <option value='Xiaomi'>Xiaomi</option>
                    <option value='Samsumg'>Samsung</option>
                </select>
                <input type="submit" className="botonFormulario"></input>
                <input type="reset" className="botonFormulario"></input>
            </form>

        </div>


    );  
};
export default RegistrarModelo;