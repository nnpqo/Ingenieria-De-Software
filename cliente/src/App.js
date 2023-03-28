import { Cabezera } from "./componentes/Cabezera"
import { Menu } from "./componentes/Menu"
import { Ventana } from "./componentes/Ventana"
import { Component } from "react"
  
export const App = ()=>{

    return <div>
        <Cabezera/>
        <Menu/>
        <Ventana/>
    </div>
}