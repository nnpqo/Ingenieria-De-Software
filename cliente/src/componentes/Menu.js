import { Boton } from "./Boton"
import {Categoria} from "./Categoria"

export const Menu= ()=>{
    
    return <div>
        <Boton/>
        <Boton/>
        
    </div>
}
export const MenuEtiquetas = ()=>{

    
    return <div>
        <h1>Categorias</h1>
        <Categoria/>
    </div>
}