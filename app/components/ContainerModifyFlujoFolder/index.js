/**
 *
 * ContainerModifyFolder
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** COMPONENTES */
import Form from 'components/Form';
import Input from 'components/Input/GroupInput';
import Button from 'components/Button';
import AButton from 'components/AButton';
import { darken } from 'polished';

import { getFlujosByNode } from 'services/ArbolFlujosService';
import {getAllNodesFlujosTree} from 'services/ArbolFlujosService'

/* Hooks */
import useForm from 'hooks/useForm';
import useTree from 'hooks/useTree';




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

  const [treeData, setTreeData] = useState({ id: 0, nodos: [] });
  const { values, handleChange, handleSubmit, setValues } = useForm(
    createOrUpdate,
    validate,
    initialValues,
  );

  const [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    findNode,
    onOpenNode,
    addNode,
    removeNode,
  ] = useTree({
    data: treeData,
  });

  async function createOrUpdate() {
    const close = await onModify(values.nombre);
    console.log(values.nombre)
    if (close) {
      onClose();
    }
  }

  async function getArea() {
    try {
      // const response = await getFlujosByNode(id);
      const temp = findNode(1)
      console.log(temp);
    } catch (e) {
      // console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      getArea();
    }
  }, []);


  useEffect(() => {
    getTree();
  }, []);

  async function getTree() {
    try {
      const response = await getAllNodesFlujosTree();
      // console.log(response)
      setTreeData(response.data.data);
    } catch {
      // console.log('error');
    }
  }

  return (
    <Container>
      <InnerContainer>
          <Title>{id ? 'Rename' : 'New Folder'} </Title>
        <FormContainer onSubmit={handleSubmit}>
          {values &&
            <Input
            labelText="Name"
            name="nombre"
            value={values.nombre || ''}
            onChange={handleChange}
          /> }

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
