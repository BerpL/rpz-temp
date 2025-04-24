/**
 *
 * Check
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdCheck } from 'react-icons/md/index.esm';
import styled from 'styled-components';
import { rgba } from 'polished';

/* components */

/* hooks */

/* tabs data */

const CheckCircle = styled.div`
  background: ${({ checked }) => (checked ? '#3ce35f' : '#cad2dc')};
  color: ${({ theme }) => theme.colors.base};
  width: 24px;
  height: 24px;
  border-radius: 5px;
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => rgba(theme.colors.text, 0.8)};
`;
const Text = styled.div`
  font-size: 13px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.7)};
`;

function Check({ onChange, name, checked = true }) {
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
    <Container>
      <CheckCircle onClick={handleClick} checked={checked}>
        <MdCheck />
      </CheckCircle>
      <Info>
        <Title>Make the Document Visible</Title>
        <Text>
          Allows you to view the document from the user interface.
        </Text>
      </Info>
    </Container>
  );
}

Check.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default Check;
