/**
 *
 * Radio
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

/* components */

/* hooks */

/* tabs data */

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
  font-size: 14px;
  user-select: none;
  cursor: pointer;
`;

const CheckCircle = styled.div`
  background: ${({ checked, color }) => (checked ? color : '#cad2dc')};
  color: ${({ theme }) => theme.colors.base};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
  vertical-align: top;
  display: flex;
  transition: background 0.2s;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  margin-right: 10px;
  ${Container}:hover & {
    background: ${({ color }) => color};
  }
`;

function Radio({ color, label, onChange, name, checked, value }) {
  // const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    // setToggle(!toggle);
    const e = {
      target: {
        name,
        value,
      },
    };

    onChange(e);
  };
  return (
    <Container onClick={handleClick}>
      <CheckCircle color={color} checked={checked} />
      {label}
    </Container>
  );
}

Radio.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
};

export default Radio;
