import React from 'react';

function ComboBox(props) {
  const options = props.options.map((option) =>
    <option key={option}>{option}</option>
  );
  return (
    <select>
      {options}
    </select>
  );
}