import React from 'react';

// import "./styles-dropdown.css";
import { ContainerDropdown } from './styles';

const DropDown = ({ json, name, register, errors, clickDropDown, open }) => {
  const handleClick = () => {
    if (json.length > 0) clickDropDown(json[0].idTipoBalanceMasa);
    // console.log(json);
  };

  const style = open
    ? {
        visibility: 'visible',
        maxHeight: '300px',
      }
    : {
        visibility: 'hidden',
        maxHeight: '0',
      };
  return (
    <ContainerDropdown >
      <div className="title-dropdown" onClick={handleClick}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
        <label>{name}</label>
      </div>
      <div className="content-dropdown" style={style}>
        {json.map(item => (
          <div key={item.idBalanceMasa}>
            <div className="form-group-dropdown" key={item.idBalanceMasa}>
              <label>
                {item.descripcion} ({item.unidadMedida})
              </label>
              <input
                ref={register({
                  pattern: {
                    value: /^[0-9]+([,.][0-9]+)?$/i,
                    message: 'Sólo ingrese caracteres',
                  },
                })}
                type="text"
                className="form-control-dropdown"
                placeholder="Value"
                name={'valor' + item.idBalanceMasa}
              />

              <input
                ref={register()}
                type="hidden"
                value={item.idBalanceMasa}
                key={item.idBalanceMasa}
                name={'idBalanceMasa' + item.idBalanceMasa}
              />
            </div>
            {errors['valor' + item.idBalanceMasa] && (
              <div className="error-message">
                {errors['valor' + item.idBalanceMasa].message}
              </div>
            )}
          </div>
        ))}
      </div>
    </ContainerDropdown>
  );
};

export default DropDown;
