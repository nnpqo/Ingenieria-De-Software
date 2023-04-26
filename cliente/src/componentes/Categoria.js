import { useEffect, useState,useContext } from "react";
import { getEtiquetas } from "../API/api";
import "../estilos/app.css";
import logo from "../imagenes/iconoAgregar.svg";
import { Aviso,eliminar } from "./Aviso";
import { CajaTexto, TextArea } from "./CajaTexto";
import { prueba } from "./VentanaPrincipal";


export const Categoria = (props) => {
  const [desplegado, setdesplegado] = useState(false);
  const [etiquetas, setEtiquetas] = useState([]);
  const [, , ,setEtiquetass] = useContext(prueba);

  useEffect(() => {
    const etiquetas = async () => {
      await getEtiquetas().then((nombres) => setEtiquetas(nombres));
    };
    etiquetas();
  }, []);

  let et = etiquetas?.map((eti) => {
    return (
      <ul>
        <Etiqueta
          nombre={eti}
          checked={"checkbox"}
          isChecked={false}
          handleCheckboxSelection={props.manejarSelecciónSelection}
        />
      </ul>
    );
  });

  return (
    <div className="categoria">
      <span className="dispositivosMoviles">
        <a
          onClick={() => {
            setdesplegado(!desplegado);
          }}
        >
          Dispositivos móviles
        </a>
        
        <Aviso trigger={iconoAgregar()}
          titulo="AGREGAR ETIQUETA"
          extra={<CajaTexto
            nombre={"Nombre de etiqueta*"}
            id={"etiquetaFormulario"}
            min={2}
            max={20}
            regex={"[ a-zA-Z0-9]+"}
          />}
          bt1Nombre={"Guardar"}
          bt1Estilo={"guardar"}
          bt1Funcion={() => eliminar(props.nombre)}
          bt2Nombre={"Cancelar"}
          bt2Estilo={"cancelar"} />
      </span>
      <div className={desplegado ? "etiquetas-visible" : "etiquetas"} >
        <input type="checkbox" id="all" onChange={()=>{chackeAll(setEtiquetass)}}></input>
        <label for="all">all</label>
      </div>
      <li className={desplegado ? "etiquetas-visible" : "etiquetas"}>{et}</li>
    </div>
  );
};
const Etiqueta = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange() {
    setIsChecked(!isChecked);
    props.handleCheckboxSelection(props.nombre, !isChecked);
  }

  /*useEffect(() => {
    setIsChecked(props.isChecked);
    console.log(props.isChecked)
  }, [props.isChecked]);*/

  return (
    <>
      <input
        type="checkbox"
        className={props.checked}
        id={props.nombre}
        checked={isChecked}
        onChange={handleChange}
      />
      <label for={props.nombre} className="nombre-etiqueta">
        {props.nombre}
      </label>
    </>
  );
};
const iconoAgregar=()=>{
  return(
    <button className="icono-agregar">
        <img src={logo}></img>
        </button>
  )
}
const chackeAll=(setEtiquetas)=>{
  
  let all=document.getElementById("all")
  console.log(all.checked)
  let etiquetas=document.getElementsByClassName("checkbox");
  console.log(etiquetas)
  let aux=[];
  if(all.checked){
    
    Array.from(etiquetas).map((item)=>{item.checked=true
      aux.push(item.id)
      //setEtiquetas()
    //item.dispatchEvent(new Event('onChange', { bubbles: true }))
    console.log( Array.from(etiquetas))})
    etiquetas.checked=true
    //etiquetas.onChange()
  }
  else{
    Array.from(etiquetas).map((item)=>{item.checked=false
      //setEtiquetas([])
      //setEtiquetas([])
      //item.dispatchEvent(new Event('change', { bubbles: true }))
      console.log(item)})
      
  }
  
  setEtiquetas(aux)
}