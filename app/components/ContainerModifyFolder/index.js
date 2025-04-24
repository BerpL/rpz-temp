/**
 *
 * ContainerModifyFolder
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** COMPONENTES */
import Form from 'components/Form';
import Input from 'components/Input/GroupInput';
import Button from 'components/Button';
import AButton from 'components/AButton';
import { darken } from 'polished';

import { getMainTreeById } from 'services/ArbolPrincipalService';

/* Hooks */
import useForm from 'hooks/useForm';

const Container = styled.div`
  width: 300px;
  /* margin-bottom: -32px;
  margin-top: -32px; */
  background: ${({ theme }) => theme.colors.base};
  overflow: hidden;
`;

const InnerContainer = styled.div`
  padding: 16px;
`;

const FormContainer = styled(Form)`
  text-align: left;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 16px;
`;

const BtnCancel = styled(AButton)`
  background: ${({ theme }) => darken('0.03', theme.colors.base)};
  color: ${({ theme }) => theme.colors.text};
  margin-right: 10px;
  transition: all 0.3s ease;
  border-bottom: 5px solid ${({ theme }) => darken('0.4', theme.colors.base)};
  &:hover {
    background: ${({ theme }) => darken('0.03', theme.colors.base)};
    border-bottom: 0px;
  }
`;

const BtnSave = styled(Button)`
  background: #3ce35f;
  border-bottom: 5px solid ${darken('0.1', '#3ce35f')};
  transition: all 0.3s ease;
  &:hover {
    background: #3ce35f;
    border-bottom: 0px;
  }
`;

const validate = values => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = 'Añade un nombre';
  }

  return errors;
};

const initialValues = {
  nombre: '',
};

function ContainerModifyFolder({ id, onClose, onModify }) {
  const { values, handleChange, handleSubmit, setValues } = useForm(
    createOrUpdate,
    validate,
    initialValues,
  );

  async function createOrUpdate() {
    console.log(values);
    const close = await onModify(values.nombre);
    if (close) {
      onClose();
    }
  }

  async function getArea() {
    try {
      const response = await getMainTreeById(id);
      setValues(response.data.data);
    } catch (e) {
      // console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      getArea();
    }
  }, []);

  return (
    <Container>
      <InnerContainer>
          <Title>{id ? 'Rename' : 'New Folder'} </Title>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            labelText="Name"
            name="nombre"
            value={values.nombre || ''}
            onChange={handleChange}
          />
          <Footer>
            {/* <BtnCancel onClick={onClose}>Cancelar</BtnCancel> */}
            <BtnSave>Save</BtnSave>
          </Footer>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
}

ContainerModifyFolder.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
  onModify: PropTypes.func,
};

export default ContainerModifyFolder;
