/**
 *
 * ContainerModifyFolder
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** COMPONENTS */
import Form from 'components/Form';
import Input from 'components/Input/GroupInput';
import Button from 'components/Button';
import Select from 'components/Select';
import { Label } from 'components/Input';
import AButton from 'components/AButton';
import { darken } from 'polished';

import { getDetailAlarmInterlock } from 'services/DetailAlarmsInterlocksService';

/* Hooks */
import useForm from 'hooks/useForm';

const ContainerInput = styled.div`
  height: 100%;
  margin-bottom: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ContainerLabel = styled.div`
  display: flex;
  position: relative;
`;

const Container = styled.div`
  width: 500px;
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

const options = [
  {
    key: 1,
    value: 'Process',
  },
  {
    key: 2,
    value: 'Permissive',
  },
  {
    key: 3,
    value: 'Security',
  },
  {
    key: 0,
    value: 'None',
  },
];

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

  // if (!values.nombre) {
  //   errors.nombre = 'Add a name';
  // }

  return errors;
};

const initialValues = {
  condicion: '',
  enclavamiento: '',
  alarma: '',
  solucion: '',
  consecuencia: '',
};

function ContainerModifyFolder({ id, onClose, onModify }) {
  const { values, handleChange, handleSubmit, setValues } = useForm(
    createOrUpdate,
    validate,
    initialValues,
  );

  async function createOrUpdate() {
    const close = await onModify(values);
    if (close) {
      onClose();
    }
  }

  async function getArea() {
    try {
      const response = await getDetailAlarmInterlock(id);
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
        <Title>{id ? 'Edit Detail' : 'New Detail'} </Title>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            labelText="Condition"
            name="condicion"
            value={values.condicion || ''}
            onChange={handleChange}
          />
          <ContainerInput>
            <ContainerLabel>
              <Label>Interlock Type</Label>
            </ContainerLabel>
            <Select
              message="Select interlock"
              name="tipoEnclavamiento"
              options={options}
              value={values.tipoEnclavamiento || ''}
              onChange={handleChange}
            />
          </ContainerInput>
          <Input
            labelText="Alarm"
            name="alarma"
            value={values.alarma || ''}
            onChange={handleChange}
          />
          <Input
            labelText="Consequence"
            name="consecuencia"
            value={values.consecuencia || ''}
            onChange={handleChange}
          />
          <Input
            labelText="Solution"
            name="solucion"
            value={values.solucion || ''}
            onChange={handleChange}
          />
          <Footer>
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
