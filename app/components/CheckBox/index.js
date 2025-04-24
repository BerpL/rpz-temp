/**
 *
 * CheckBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  z-index: 0;
  position: relative;
  display: inline-block;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  line-height: 1.5;
`;

const Input = styled.input`
  appearance: none;
  z-index: -1;
  position: absolute;
  left: -10px;
  top: -8px;
  display: block;
  margin: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: none;
  outline: none;
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
  transition: opacity 0.3s, transform 0.2s;
`;

const Span = styled.span`
  display: inline-block;
  width: 100%;
  cursor: pointer;
  &::before {
    content: '';
    display: inline-block;
    box-sizing: border-box;
    margin: 3px 11px 3px 1px;
    border: solid 2px;
    color: transparent;
    border-color: ${({ checked, theme: { primary, text } }) =>
      checked ? primary : text};
    border-radius: 2px;
    background: ${({ checked, theme: { primary } }) =>
      checked ? primary : 'transparent'};
    width: 15px;
    height: 15px;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 0px;
    width: 10px;
    height: 5px;
    border: solid 2px ${({ checked }) => (checked ? 'white' : 'transparent')};
    border-right: none;
    border-top: none;
    transform: translate(3px, 4px) rotate(-45deg);
  }
`;

function CheckBox({ selected, name, withName, onChange, identifier }) {
  const handleChange = () => {
    onChange(identifier, name, !selected);
    // console.log(selected)
  };

  // console.log(selected)
  // console.log(identifier)

  return (
    <Container onClick={handleChange}>
      <Input type="checkbox" />

      {withName ? (
        <Span checked={selected}>{name}</Span>
      ) : (
        <Span checked={selected} />
      )}
    </Container>
  );
}

CheckBox.propTypes = {
  withName: PropTypes.bool,
  selected: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  identifier: PropTypes.any,
};

CheckBox.defaultProps = {
  withName: true,
  selected: false,
};

export default CheckBox;
