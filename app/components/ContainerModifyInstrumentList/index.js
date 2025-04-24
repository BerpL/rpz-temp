import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//== COMPONENTES
import Form from 'components/Form';
import Input from 'components/Input/GroupInput';
import Button from 'components/Button';
import { darken } from 'polished';

/* Servicios */
import { getListaInstrumentosId } from '../../services/ListaInstrumentoService';

/* Hooks */
import useForm from 'hooks/useForm';

const Container = styled.div`
  width: 350px;
  transition: width 0.2s, height 0.4s;
  background: #eee;
  overflow: hidden;
  display: flex;
`;

const InnerContainer = styled.div`
  padding: 16px;
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.base};
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 16px;
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

const BtnSave = styled(Button)`
  background: #3ce35f;
  border-bottom: 5px solid ${darken('0.1', '#3ce35f')};
  transition: all 0.3s ease;
  &:hover {
    background: #3ce35f;
    border-bottom: 0px;
  }
`;

//== Formulario Settings
const validate = values => {
  const errors = {};

  if (!values.tag) {
    errors.tag = 'Add a tag';
  }

  return errors;
};

const initialValues = {
  tag: '',
};

const ContainerModifyInstrumentList = ({
  id,
  idGrupoControl,
  onClose,
  onModify,
}) => {
  const { values, handleChange, handleSubmit, setValues } = useForm(
    createOrUpdate,
    validate,
    initialValues,
  );

  async function createOrUpdate() {
    const data = await onModify({
      ...values,
      idGrupoControl,
      idListaInstrumento: id,
    });
    onClose();
  }

  async function getInstrument() {
    try {
      const response = await getListaInstrumentosId(id);
      setValues(response.data.data);
      //console.log("This is the data: ", response.data.data)
    } catch {}
  }

  useEffect(() => {
    if (id) {
      getInstrument()
    };
  }, []);

  return (
    <Container>
      <InnerContainer>
        <Title>{id ? "Edit" : "Add" } Instrument List</Title>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            labelText="Tag"
            name="tag"
            onChange={handleChange}
            value={values.tag}
          />
          <Input
            labelText="Instrument Type"
            name="tipoInstrumento"
            onChange={handleChange}
            value={values.tipoInstrumento}
          />
          <Input
            labelText="Description"
            name="descripcion"
            onChange={handleChange}
            value={values.descripcion}
          />
          <Input
            labelText="P&Ds"
            name="pid"
            onChange={handleChange}
            value={values.pid}
          />

          <Footer>
            <BtnSave>Save</BtnSave>
          </Footer>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

ContainerModifyInstrumentList.propTypes = {
  id: PropTypes.any,
  idGrupoControl: PropTypes.any,
  onClose: PropTypes.func,
  onModify: PropTypes.func,
};

export default ContainerModifyInstrumentList;
