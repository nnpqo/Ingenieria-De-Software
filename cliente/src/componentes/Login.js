import { Link } from "react-router-dom";
import { Boton } from "./Boton"
import { useState, useEffect } from "react";
import "../estilos/login.css";
import usuarioimg from "../imagenes/usuario.svg";
import candado from "../imagenes/candado.svg";

export const Login = () => {
    let intervalId = null;

    function createSquare(){
        const section = document.querySelector('section');
        const square = document.createElement('span');
        square.classList.add('burbuja');
        var size = Math.random() * 20;

        square.style.width = 20 + size + 'px';
        square.style.height = 20 + size + 'px';

        square.style.top = Math.random() * window.innerHeight + 'px';
        square.style.left = Math.random() * window.innerWidth + 'px';

        section.appendChild(square);
        setTimeout(() =>{
            square.remove()
        }, 5000)
    }

    useEffect(() => {
        intervalId = setInterval(createSquare , 150)
        return () => clearInterval(intervalId);
    }, []);

    return <section id="login">
        <div className="login-form-cont">
            <div className="input-grup">
                <div className="titulo">
                    <h2 className="letra" id="letrajdkcell-1">JDK</h2>
                    <h2 className="letra" id="letrajdkcell">CELL</h2>
                    
                </div>
                
            </div>
            <h2 className="letra">Ingresar</h2>
            <div className="input-grup">
            <div class="icon">
            <img src={usuarioimg} />
            </div>

                <input className="inputLogin"type="text" required="required" />
                <label className="labelLogin">Nombre de Usuario</label>
            </div>
            <div className="input-grup">
            <div class="icon">
            <img src={candado} />
            </div>
                <div className="ojo" id="ojo"><i className="fa-solid fa-eye"></i></div>
                <div className="ojoc" id="ojoc">
                    <i className="fa-sharp fa-solid fa-eye-slash"></i>
                </div>
                <input className="inputLogin" type="password" required="required" />
                <label className="labelLogin">Contraseña</label>
            </div>
            <div className="input-grup">
                <a className="acceder" href="#/home">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Acceder
                </a>
            </div>
            

        </div>
    </section>
}

/*



<div>
                <input type="text" id="usuario" name="nombre" placeholder="usuario" />
                <input type="password" name="password" placeholder="contraseña" />
            </div>
            <Link to="/home">
                <Boton stilos={"guardar"} nombre={"acceder"}></Boton>
            </Link>

function createSquare(){
    const section = document.querySelector('section');
    const square = document.createElement('span');
    var size = Math.random() * 20;
    
    square.style.width = 20 + size + 'px';
    square.style.height = 20 + size + 'px';
    
      square.style.top = Math.random() * window.innerHeight + 'px';
    square.style.left = Math.random() * window.innerWidth + 'px';
    
    section.appendChild(square);
      setTimeout(() =>{
      square.remove()
    }, 5000)
  }
  setInterval(createSquare , 150)*/