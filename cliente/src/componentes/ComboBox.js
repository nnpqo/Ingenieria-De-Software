import React from 'react';

export function ComboBox(props) {
  const opciones = props.opciones.map((opciones) =>
    <option key={opciones}>{opciones}</option>
  );
  return (<div className='combo-box'>
    <p>{props.nombre}</p>
    <select>
      {opciones}
    </select>
  </div>
  );
}