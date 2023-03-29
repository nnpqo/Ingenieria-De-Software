
export const Categoria=()=>{

    return <div>
        <li>
            <ul> 
                <li>
                    <ul><Etiqueta/></ul>
                    <ul><Etiqueta/></ul>
                    <ul><Etiqueta/></ul>
                </li>
            </ul>
        </li>
    </div>
}
const Etiqueta=(props)=>{

    return <>
        <input type="checkbox" name=""/>
        <span>{props.nombre}</span>
    </>
}