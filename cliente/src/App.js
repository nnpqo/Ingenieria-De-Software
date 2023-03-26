import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import RegistrarModelo from './componentes/RegistrarModelo';

function App() {
  return (
    <div className="JDKCELL">
      <header className="JDK-header">
        <title>venta</title>
        <button id='logo'>JDKCELL</button>
        <button className='seccion'>
          <img src={logo} alt="productoIMG"/>
          <span>producto</span>
        </button>
      </header>
      <body>
        <div id='izq'>

        </div>
        <RegistrarModelo/>
      </body>
      
    </div>
  );
}

export default App;
