import { useEffect, useState,useContext } from "react";
import { getEtiquetas } from "../API/api";
import "../estilos/app.css";
import logo from "../imagenes/iconoAgregar.svg";
import { Aviso, AvisoEti, eliminar } from "./Aviso";
import { CajaTexto, TextArea } from "./CajaTexto";
import {agregarEtiqueta} from "../API/etiquetas"

import { prueba } from "./VentanaPrincipal";



export const Categoria = (props) => {
  const [desplegado, setdesplegado] = useState(false);
  const [etiquetas, setEtiquetas] = useState([]);
  const [nuevaEti,setNuevaEti]=useState(false)
  const [, , ,setEtiquetass] = useContext(prueba);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const etiquetas = async () => {
      await getEtiquetas().then((nombres) => setEtiquetas(nombres));
    };
    etiquetas();
  }, [nuevaEti]);

  let et = etiquetas?.map((eti) => {
    return (
      <ul>
        <Etiqueta
          nombre={eti}
          checked={"checkbox"}
          isChecked={isChecked}
          handleCheckboxSelection={props.manejarSelecciónSelection}
          setIsChecked={setIsChecked}
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
          className="Dispositivos"
        >
          Dispositivos móviles
        </a>
        <AvisoEti
          trigger={iconoAgregar()}
          titulo="AGREGAR ETIQUETA"
          bt1Nombre={"Guardar"}
          bt1Estilo={"guardar"}
          bt1Funcion={()=>{ agregarEtiqueta(document.getElementById("etiquetaFormulario").value);
            nuevaEti? setNuevaEti(false):setNuevaEti(true)}}
          bt2Nombre={"Cancelar"}
          bt2Estilo={"cancelar"}
        />
      </span>
      {/* <div className={desplegado ? "etiquetas-visible" : "etiquetas"} >
        <div className="contenedor-seleccionar">
        <input type="checkbox" id="all" className="checkbox" onChange={chackeAll}></input>
        <label for="all" className="Seleccionar">Seleccionar todos</label>
        </div>
      </div> */}
      <div className={desplegado ? "etiquetas-visible" : "etiquetas"} >
        <div className="contenedor-seleccionar">
        <input type="checkbox" id="all" className="checkbox" onChange={()=>{chackeAll(setEtiquetass,setIsChecked)}}></input>
        <label for="all" className="Seleccionar">Seleccionar todos</label>
        </div>
      </div>
      <li className={desplegado ? "etiquetas-visible" : "etiquetas"}>{et}</li>
    </div>
  );
};
const Etiqueta = (props) => {
  const isChecked=props.isChecked;
  const setIsChecked=props.setIsChecked;
  let a=document.getElementById(props.nombre)
  const [check,setCheck]= useState(false);

  function handleChange() {
    a=document.getElementById(props.nombre)
    setIsChecked(a.checked);
    console.log(a.checked);
    setCheck(!check)
    props.handleCheckboxSelection(props.nombre, a.checked);
  }

  useEffect(() => {
    setIsChecked(props.isChecked);
    let all=document.getElementById("all")
    if (all.checked){
      all.checked =false;
    }
  },[check]);

  return (
    <div id={"div-"+props.nombre}>
      <input
        type="checkbox"
        className={props.checked}
        id={props.nombre}
        //checked={props.isCheckd}
        onChange={handleChange}
      />
      <label for={props.nombre} className="nombre-etiqueta">
        {props.nombre}
      </label>
    </div>
  );
};
const iconoAgregar = () => {
  return (
    <button className="icono-agregar">
        <img className="icono" src={logo}></img>
        </button>
  )
}
const chackeAll=(setEtiquetas,setIsChecked)=>{
  
  let all=document.getElementById("all")

  let etiquetas=document.getElementsByClassName("checkbox");
 
  let aux=[];
  if(all.checked){
    
    Array.from(etiquetas).map((item)=>{item.checked=true
      aux.push(item.id)})
  }
  else{
    Array.from(etiquetas).map((item)=>{item.checked=false})
      
  }
  setEtiquetas(aux)
  console.log(etiquetas[0].checked)
}
