/**
 *
 * ContainerModifyQuiz
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Form from 'components/Form';
import GroupInput from 'components/Input/GroupInput';
import GroupTextarea from 'components/Input/GroupTextarea';
import { darken } from 'polished';

import { getQuizById } from 'services/EvaluacionesService';

/* Hooks */
import useForm from 'hooks/useForm';

const Container = styled.div`
  width: 500px;
  background: ${({ theme }) => theme.colors.base};
`;
const FormContainer = styled.div`
  padding: 15px 26px;
  margin-bottom: -32px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding: 0 26px;
`;

const Footer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonAccept = styled.button`
  min-height: 36px;
  background: #3ce35f;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 0 16px;
  transition: transform 0.2s;
  display: inline-block;
  color: ${({ theme }) => theme.colors.base};
  border-bottom: 5px solid ${darken('0.1', '#3ce35f')};
  transition: all 0.3s ease;

  &:hover {
    border-bottom: 0px;
  }
`;

const ButtonCancel = styled.a`
  min-height: 36px;
  background: ${({ theme }) => darken('0.03', theme.colors.base)};
  outline: none;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  border-bottom: 5px solid ${({ theme }) => darken('0.4', theme.colors.base)};
  &:hover {
    border-bottom: 0px;
  }
`;

const validate = values => {
  const errors = {};

  return errors;
};
const initialValues = {
  nombre: '',
};

const ContainerModifyQuiz = ({ id, onClose, onModify }) => {
  const { values, handleChange, handleSubmit, setValues } = useForm(
    createOrUpdate,
    validate,
    initialValues,
  );

  async function createOrUpdate() {
    // History.replace('/admin/quiz/32');
    const close = await onModify(values);
    if (close) {
      onClose();
    }
  }

  async function getArea() {
    try {
      const response = await getQuizById(id);
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
      <Title>Create an Assessment</Title>
      <FormContainer>
        <Form style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
          <GroupInput
            labelText="Assessment Name"
            name="nombre"
            value={values.nombre || ''}
            onChange={handleChange}
          />
          <GroupInput
            labelText="Duration (minutes)"
            name="duracion"
            value={values.duracion || ''}
            onChange={handleChange}
          />
          <GroupTextarea
            labelText="Description"
            name="descripcion"
            value={values.descripcion || ''}
            onChange={handleChange}
          />
          <Footer>
            <ButtonCancel onClick={onClose} tabIndex="-1">
              Cancel
            </ButtonCancel>
            <ButtonAccept>Save</ButtonAccept>
          </Footer>
        </Form>
      </FormContainer>
    </Container>
  );
};

ContainerModifyQuiz.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
  onModify: PropTypes.func,
};

export default ContainerModifyQuiz;
