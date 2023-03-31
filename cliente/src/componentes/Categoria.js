export const Categoria = () => {
  return (
    <div>
      <li>
        <ul>
          <li>
            <ul>
              <Etiqueta nombre={'samsumg'}/>
            </ul>
            <ul>
              <Etiqueta nombre={'xiaomi'}/>
            </ul>
            <ul>
              <Etiqueta nombre={'lg'}/>
            </ul>
          </li>
        </ul>
      </li>
    </div>
  );
};
const Etiqueta = (props) => {
  return (
    <>
      <input type="checkbox" name="" />
      <span>{props.nombre}</span>
    </>
  );
};
