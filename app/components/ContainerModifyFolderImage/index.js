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
import Upload from 'components/UploadImageInput';
import { darken } from 'polished';
import { Label } from 'components/Input';

import { getMainTreeById } from 'services/ArbolPrincipalService';
import { hostUrlBase } from 'services/Api';
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
  width: 350px;
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
  image: '',
};

function ContainerModifyFolder({ id, onClose, onModify }) {
  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    handleChangeFiles,
  } = useForm(createOrUpdate, validate, initialValues);

  async function createOrUpdate() {
    const close = await onModify(
      values.nombre,
      values.image ? values.image[0] : null,
    );
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

  const imagePath = values.imagenArea
    ? values.imagenArea.replace(/\\/g, '/').trim()
    : '';

  const imagen = values.image ? values.image[0] : null;

  const getImage = () => {
    if (imagen) {
      return URL.createObjectURL(imagen);
    }

    if (imagePath) {
      return `${hostUrlBase}/${imagePath}`;
    }

    return null;
  };

  return (
    <Container>
      <InnerContainer>
        <Title>{id ? 'Edit Folder' : 'New Folder'} </Title>
        <FormContainer onSubmit={handleSubmit}>
          <ContainerInput>
            <ContainerLabel>
              <Label>Image</Label>
            </ContainerLabel>
            <Upload
              name="image"
              onChange={handleChangeFiles}
              value={getImage()}
            />
          </ContainerInput>
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
