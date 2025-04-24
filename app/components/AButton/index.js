/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

/* utils */
import { rgba, darken } from 'polished';

const Container = styled.a`
  background: ${({ bgColor }) => bgColor};
  color: ${({ clColor }) => clColor};
  height: 40px;
  font-size: 14px;
  padding: 0px 16px;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.2s;
  user-select: none;
  font-family: 'Noto Sans HK', sans-serif;
  transition: background 0.1s;
  &:hover {
    background: ${({ bgColor }) => darken('0.1', bgColor)};
  }

  svg {
    margin-right: 10px;
    font-size: 20px;
  }
`;

function Button({
  theme,
  children,
  typeButton,
  style,
  type = 'normal',
  onClick,
  ...props
}) {
  let bgColor;
  let clColor;
  let boxShadow;
  if (type === 'normal') {
    bgColor = theme.colors.primary;
    clColor = theme.colors.base;
  }

  if (type === 'white') {
    bgColor = theme.colors.base;
    clColor = rgba(theme.colors.text, 0.5);
  }

  if (type === 'transparent') {
    bgColor = theme.colors.transparent;
    clColor = rgba(theme.colors.text, 0.5);
  }

  if (type === 'disabled') {
    bgColor = rgba(theme.colors.text, 0.2);
    clColor = rgba(theme.colors.text, 0.5);
  }

  return (
    <Container
      style={style}
      bgColor={bgColor}
      type={typeButton}
      boxShadow={boxShadow}
      clColor={clColor}
      {...props}
    >
      {children}
    </Container>
  );
}

Button.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  children: PropTypes.any,
  typeButton: PropTypes.string,
  type: PropTypes.string,
};

export default withTheme(Button);
