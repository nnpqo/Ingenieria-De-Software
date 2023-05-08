import { Link } from "react-router-dom";
import { Boton } from "./Boton"

export const Login =()=>{
    return <div id="login"> 
        <div id="caja-login">
            <div id="titulo">
                <h1 id="jdk">JDK</h1>
                <h1 id="cell">CELL</h1>
                <h1 id="ingresa">INGRESA</h1>
            </div>
            <div>
            <input type="text" id="usuario" name="nombre" placeholder="usuario"/>
            <input type="password" name="password" placeholder="contraseña" />
            </div>
            <Link to="/home"> 
                <Boton stilos={"guardar"} nombre={"acceder"}></Boton>
            </Link>
        </div>
    </div>  
}