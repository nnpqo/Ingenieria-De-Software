//import logo from './logoProducto.svg';
import './App.css';
import { Component } from 'react';
import RegistrarModelo from './componentes/RegistrarModelo';

function App() {
  return (
    <div className="JDKCELL">
      <header className="JDK-header">
        <title>venta</title>
        <button id='logo'>JDKCELL</button>
        <button className='seccion'>producto</button>
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
