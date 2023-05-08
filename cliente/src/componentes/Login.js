import { Link } from "react-router-dom";
import { Boton } from "./Boton"
import { useState,useEffect } from "react";
import "../estilos/login.css";

export const Login =()=>{
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
        </section>
}

/*function createSquare(){
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