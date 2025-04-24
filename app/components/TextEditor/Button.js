/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

const B = styled.div`
  outline: none;
  cursor: pointer;
  padding: 0px 2px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin: 4px;
  line-height: 20px;
  font-size: 15px,
  align-items: center;
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  font-weight: 500;
  border: 1px solid
    ${({ active, theme }) =>
    active ? rgba(theme.colors.text, 0.2) : 'transparent'};
  background: 
    ${({ active, theme }) =>
    active ? rgba(theme.colors.text, 0.05) : 'transparent'};

  svg {
    fill: ${({ fill }) => fill || 'currentColor'};
  }
  &:hover {
    background: ${({ theme }) => rgba(theme.colors.text, 0.05)};
  }
`;

function Button(props) {
  return <B {...props}>{props.children}</B>;
}

Button.propTypes = {
  children: PropTypes.any,
};

export default Button;
