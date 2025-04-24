/**
 *
 * GroupInput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

/* utils */
import { rgba } from 'polished';

/* components */
import Input from './NewInput';
import Label from './Label';

const Container = styled.div`
  height: 100%;
  margin-bottom: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ContainerLabel = styled.div`
  display: flex;
  position: relative;
`;

const ToggleContainer = styled.div`
  position: absolute;
  right: 0;
  top: -3px;
  transform: scale(0.7);
`;

function GroupInput({
  labelText,
  style,
  toggle,
  disabled = false,
  theme,
  ...props
}) {
  const inColor = disabled ? rgba(theme.colors.text, 0.1) : theme.colors.base;
  return (
    <Container disabled={disabled} style={style}>
      <ContainerLabel>
        <Label>{labelText}</Label>
        <ToggleContainer>{toggle}</ToggleContainer>
      </ContainerLabel>
      <Input inColor={inColor} disabled={disabled} {...props} />
    </Container>
  );
}

GroupInput.propTypes = {
  labelText: PropTypes.string,
  style: PropTypes.object,
  toggle: PropTypes.any,
  disabled: PropTypes.bool,
  theme: PropTypes.object,
};

export default withTheme(GroupInput);
