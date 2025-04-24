/**
 *
 * Check
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdCheck } from 'react-icons/md/index.esm';
import styled from 'styled-components';

/* components */

/* hooks */

/* tabs data */

const CheckCircle = styled.div`
  background: ${({ checked }) => (checked ? '#3ce35f' : '#cad2dc')};
  color: ${({ theme }) => theme.colors.base};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
  vertical-align: top;
  display: flex;
  cursor: pointer;
  transition: background 0.3s;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  margin-right: 10px;
`;

function Check({ onChange, name, checked }) {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
    const e = {
      target: {
        name,
        value: !checked,
      },
    };

    onChange(e);
  };
  return (
    <CheckCircle onClick={handleClick} checked={checked}>
      <MdCheck />
    </CheckCircle>
  );
}

Check.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default Check;
