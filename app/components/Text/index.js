/**
 *
 * Text
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { lighten } from 'polished';

function Text({
  type = 'p',
  children,
  fontSize = 16,
  style,
  fontWeight = 400,
  color,
  background,
  button,
  onClick,
  theme,
}) {
  const T = styled(type)`
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    color: ${theme[color || 'base']};
    margin: 0;
    transition: all 0.5s;
    ${button &&
      `
      background: ${background ? theme[background] : 'transparent'};
      border-radius: 8px;
      padding: 10px 14px;
      display: inline-block;
      outline: none;
      user-select: none;
      display: 'flex';
      alignItems: 'center';
      justifyContent: 'center';
      cursor: pointer;
      font-weight: 700;
      &:hover {
        background: ${
          background ? lighten(0.1, theme[background]) : 'transparent'
  }
    `};
  `;

  return (
    <T style={style} onClick={onClick}>
      {children}
    </T>
  );
}

Text.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  theme: PropTypes.object,
  children: PropTypes.any,
  fontSize: PropTypes.number,
  style: PropTypes.object,
  fontWeight: PropTypes.number,
  button: PropTypes.bool,
  background: PropTypes.string,
  onClick: PropTypes.func,
};

export default withTheme(Text);
