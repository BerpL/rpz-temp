/**
 *
 * TooltipForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin || '0'};
  display: block;
  position: relative;
`;

const Inner = styled.div``;

const Tooltip = styled.div`
  bottom: calc(100% + 20px);
  left: 50%;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  margin-left: -80px;
  padding: 7px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
  color: #fff;
  text-align: center;
  width: 160px;
  font-size: 13px;
  line-height: 1.2;
  position: absolute;
  &:after {
    position: absolute;
    top: 100%;
    left: 50%;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    margin-left: -5px;
    width: 0;
    border-top: 5px solid ${({ color }) => color};
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: ' ';
    font-size: 0;
    line-height: 0;
  }
`;

function TooltipForm({ children, tip, color, width, margin, visible }) {
  return (
    <Container width={width} margin={margin}>
      <Tooltip visible={visible} color={color}>
        {tip}
      </Tooltip>
      <Inner>{children}</Inner>
    </Container>
  );
}

TooltipForm.propTypes = {};

export default TooltipForm;
