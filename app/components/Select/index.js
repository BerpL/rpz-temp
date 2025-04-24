/**
 *
 * Select
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* utils */
import { rgba } from 'polished';

const SelectContainer = styled.div`
  select {
    width: 100%;
    font-size: 16px;
    height: 40px;
    border-radius: 4px;
    color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
    outline: none;
    transition: transform 0.2s, box-shadow 0.3s;
    vertical-align: middle;
    opacity: 1;
    padding: 0 8px;
    border: 1px solid rgba(41, 42, 58, 0.34);
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    &:focus {
      background-color: rgba(41, 42, 58, 0.03);
      border: 1px solid rgba(41, 42, 58, 0.67);
    }
  }
`;

function Select({
  options = [],
  message = 'Select an option',
  onChange = () => {},
  name = '',
  style,
  value = '',
  className,
}) {
  return (
    <SelectContainer style={style} className={className}>
      <select value={value} name={name} onChange={onChange}>
        <option value="" disabled>
          {message}
        </option>
        {options.map(option => (
          <option
            key={option.key || option.idGrupo}
            value={option.key || option.idGrupo}
          >
            {option.nombre || option.value}
          </option>
        ))}
      </select>
    </SelectContainer>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  message: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Select;
