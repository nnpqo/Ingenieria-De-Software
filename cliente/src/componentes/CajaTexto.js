import React from "react";
import { useState } from 'react';
import "../estilos/cajaTexto.css";



export const CajaTexto = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (event) => {
    setIsValid(event.target.validity.valid); // Actualiza el estado 'isValid'
    setErrorMsg(event.target.validationMessage); // Actualiza el estado 'errorMsg' con el mensaje de error proporcionado por el navegador
    const aux=props.id;
    if(aux == 'precio' || aux == 'Cambiar precio'){
      if (event.target.value.length < props.min) {
        setErrorMsg(`El valor ingresado es demasiado corto (mínimo ${props.min} dígito)`); // Establece un mensaje de error personalizado si el valor es demasiado corto
      } else if (event.target.value.match(props.regex)) {
        setErrorMsg(`El precio debe ser mayor a 1Bs`); // Establece un mensaje de error personalizado si el valor contiene caracteres no permitidos
      } else {
        setErrorMsg(''); // Si no hay errores de validación, establece 'errorMsg' en una cadena vacía
      }
      

    }else{
      if (event.target.value.length < props.min) {
        setErrorMsg(`El valor ingresado es demasiado corto (mínimo ${props.min} caracteres)`); // Establece un mensaje de error personalizado si el valor es demasiado corto
      } else if (event.target.value.match(props.regex)) {
        setErrorMsg(`El valor ingresado contiene caracteres no permitidos`); // Establece un mensaje de error personalizado si el valor contiene caracteres no permitidos
      } else {
        setErrorMsg(''); // Si no hay errores de validación, establece 'errorMsg' en una cadena vacía
      }
    }
    
   
  };

  const handleInvalid = (event) => {
    setIsValid(false); // Establece el estado 'isValid' en 'false'
    setErrorMsg(props.errorMsg || event.target.validationMessage); // Actualiza el estado 'errorMsg' con la propiedad 'errorMsg' proporcionada o el mensaje de error proporcionado por el navegador
  };

  return (
    <div className="cajaTexto">
      <label className="letras">{props.nombre}</label>
      <input
        id={props.id}
        type="text"
        pattern={props.regex}
        maxLength={props.max}
        minLength={props.min}
        required
        onInput={handleInput}
        onInvalid={handleInvalid}
      />
      {!isValid && (
        <div className="errorMensaje">{errorMsg}</div>
      )}
    </div>
  );
};

export const TextArea = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (event) => {
    setIsValid(event.target.validity.valid); // Actualiza el estado 'isValid'
    setErrorMsg(event.target.validationMessage); // Actualiza el estado 'errorMsg' con el mensaje de error proporcionado por el navegador
    if (event.target.value.length < props.min) {
      setErrorMsg(`El valor ingresado es demasiado corto (mínimo ${props.min} caracteres)`); // Establece un mensaje de error personalizado si el valor es demasiado corto
    } else if (event.target.value.match(props.regex)) {
      setErrorMsg(`El valor ingresado contiene caracteres no permitidos`); // Establece un mensaje de error personalizado si el valor contiene caracteres no permitidos
    } else {
      setErrorMsg(''); // Si no hay errores de validación, establece 'errorMsg' en una cadena vacía
    }
  };

  const handleInvalid = (event) => {
    setIsValid(false); // Establece el estado 'isValid' en 'false'
    setErrorMsg(props.errorMsg || event.target.validationMessage); // Actualiza el estado 'errorMsg' con la propiedad 'errorMsg' proporcionada o el mensaje de error proporcionado por el navegador
  };
  return (
    <div className="textarea">
      <label className="letras">{props.nombre}</label>
      <textarea id={props.id} type="text" pattern={props.regex} maxLength={props.max} minLength={props.min} rows="3" cols="50" required  onInput={handleInput}
        onInvalid={handleInvalid}/> {!isValid && (
          <div className="errorMensaje">{errorMsg}</div>
        )}
    </div>
  );
}
