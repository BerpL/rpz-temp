/**
 *
 * InputAdmin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import FieldForm from 'components/FieldForm';
import { rgba } from 'polished';

const ContainerInput = styled.div`
  display: flex;
  position: relative;
  display: flex;
  text-align: left;
  align-items: center;
`;

const Container = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  color: ${({ theme: { textMenu } }) => textMenu};
  font-size: 13px;
  flex: 1;
`;

const InputContainer = styled.input`
  padding: 10px 26px;
  min-width: 250px;
  font-size: 13px;
  display: block;
  flex: 2;
  outline: none;
  background: ${({ theme: { base, error }, hasError }) =>
    hasError ? rgba(error, 0.1) : base};
  color: ${({ theme: { text } }) => text};
  border-radius: 23px;
  transition: border 0.3s ease-in;
`;

const ErrorText = styled.div`
  font-style: italic;
  font-size: 11px;
  margin-top: 5px;
  text-align: right;
  color: ${({ theme: { error } }) => error};
`;

function Input(props) {
  const { type, label, required, noLabel = false, placeholder = '' } = props;

  return (
    <Container>
      <ContainerInput>
        {!noLabel && (
          <Label>
            {label} {required && '(*)'}
          </Label>
        )}

        <InputContainer
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </ContainerInput>
    </Container>
  );
}

Input.propTypes = {};

function InputAdmin(props) {
  return <Input {...props} />;
}

InputAdmin.propTypes = {};

export default InputAdmin;
