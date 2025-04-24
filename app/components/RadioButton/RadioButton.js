/**
 *
 * RadioButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';
import RadioButtonLabel from './RadioButtonLabel';
import RBInput from './RBInput';

function RadioButton({ name, value, label, checked = false, onChange }) {
  return (
    <Item>
      <RBInput
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <RadioButtonLabel />
      <div>{label}</div>
    </Item>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default RadioButton;
