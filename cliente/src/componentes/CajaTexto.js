import React from "react";
import { useState } from "react";
import "../estilos/cajaTexto.css";

export const CajaTexto = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (event) => {
    setErrorMsg(event.target.validationMessage); // Actualiza el estado 'errorMsg' con el mensaje de error proporcionado por el navegador
    setIsValid(event.target.validity.valid); // Actualiza el estado 'isValid'
    const aux = props.id;
    if (aux === "precio" || aux === "Cambiar precio") {
      // if (event.target.value.length === 1 && event.target.value === '0') {
      if (event.target.value < props.min) {
        setErrorMsg(`El precio ingresado debe ser mayor o igual ${1} Bs)`); // Establece un mensaje de error personalizado si el valor es demasiado corto
      } else if (event.target.value.match(props.regex)) {
        setErrorMsg(`El precio debe ser mayor a 1Bs`); // Establece un mensaje de error personalizado si el valor contiene caracteres no permitidos
      } else if (isNaN(event.target.value)) {
        setErrorMsg("El valor ingresado debe ser un número"); // Si no hay errores de validación, establece 'errorMsg' en una cadena vacía
      } else if (parseInt(event.target.value.precio)>20000  ){
        setErrorMsg(`El precio ingresado debe ser menor a ${20000}.)`) 
          
      }

    } else {
      if (event.target.value.length < props.min) {
        setErrorMsg(
          `El valor ingresado es demasiado corto (mínimo ${props.min} caracteres)`
        ); // Establece un mensaje de error personalizado si el valor es demasiado corto
      } else if (event.target.value.match(props.regex)) {
        setErrorMsg(`El valor ingresado contiene caracteres no permitidos`); // Establece un mensaje de error personalizado si el valor contiene caracteres no permitidos
      } else {
        setErrorMsg(""); // Si no hay errores de validación, establece 'errorMsg' en una cadena vacía
      }
    }
    
  };

  const handleInvalid = (event) => {
    setErrorMsg(props.errorMsg || event.target.validationMessage); // Actualiza el estado 'errorMsg' con la propiedad 'errorMsg' proporcionada o el mensaje de error proporcionado por el navegador
    setIsValid(false); // Establece el estado 'isValid' en 'false'
  };

  return (
    <div className="cajaTexto">
      <label className="letras">{props.nombre}</label>
      <input
        id={props.id}
        type="text"
        // type= {props.id === "precio" ?  "number":"text"}
        // max={props.id === "precio" ?   "20000":""}
        // min={props.id === "precio" ?   "1":""}
        pattern={props.regex}
        maxLength={props.max}
        minLength={props.min}
        required
        onInput={handleInput}
        onInvalid={handleInvalid}
        className={isValid ? "" : "invalid"}
      />
      {!isValid && (<div className ={props.class}>
        <div className="errorMensaje">
          <div className="fondo">
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"
                  fill="#ff2e00"
                />
              </svg>
            </div>
          </div>
          &nbsp; &nbsp; &nbsp;{errorMsg}
        </div>
        </div>
      )}
    </div>
  );
};

export const TextArea = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (event) => {
    setIsValid(event.target.validity.valid); // Actualiza el estado 'isValid'
    setErrorMsg(event.target.validationMessage); // Actualiza el estado 'errorMsg' con el mensaje de error proporcionado por el navegador
    if (event.target.value.length < props.min) {
      setErrorMsg(
        `El valor ingresado es demasiado corto (mínimo ${props.min} caracteres)`
      ); // Establece un mensaje de error personalizado si el valor es demasiado corto
    } else if (event.target.value.match(props.regex)) {
      setErrorMsg(`El valor ingresado contiene caracteres no permitidos`); // Establece un mensaje de error personalizado si el valor contiene caracteres no permitidos
    } else {
      setErrorMsg(""); // Si no hay errores de validación, establece 'errorMsg' en una cadena vacía
    }
  };

  const handleInvalid = (event) => {
    setIsValid(false); // Establece el estado 'isValid' en 'false'
    setErrorMsg(props.errorMsg || event.target.validationMessage); // Actualiza el estado 'errorMsg' con la propiedad 'errorMsg' proporcionada o el mensaje de error proporcionado por el navegador
  };
  return (
    <div className="textarea">
      <label className="letras">{props.nombre}</label>
      <textarea
        id={props.id}
        type="text"
        pattern={props.regex}
        maxLength={props.max}
        minLength={props.min}
        rows="3"
        cols="50"
        required
        onInput={handleInput}
        onInvalid={handleInvalid}
        className={isValid ? "" : "invalid"}
      />{" "}
      {!isValid && (
        <div className="errorMensaje">
          <div className="fondo">
            <div className="icon">
              <svg
                viewBox="0 0 24 24"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"
                  fill="#ff2e00"
                />
              </svg>
            </div>
          </div>
          &nbsp; &nbsp; &nbsp;{errorMsg}
        </div>
      )}
    </div>
  );
};
