/**
 *
 * ContainerModifyObjeto3D
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** COMPONENTS */
import Form from 'components/Form';
import Input from 'components/Input/GroupInput';
import { Label } from 'components/Input';
import Button from 'components/Button';
import UploadInput from 'components/UploadFilesInputInline';
import AButton from 'components/AButton';
import Upload from 'components/UploadImageInput';
import { darken } from 'polished';
import { hostUrlBase } from 'services/Api';
import { getObject3DById } from 'services/Objeto3DService';
import useForm from 'hooks/useForm';

/* Hooks */

const Container = styled.div`
  width: 400px;
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

const ContainerInput = styled.div`
  height: 100%;
  margin-bottom: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ContainerLabel = styled.div`
  display: flex;
  position: relative;
`;

const validate = values => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = 'Add a name';
  }

  return errors;
};

const initialValues = {
  nombre: '',
};

function ContainerModifyObjeto3D({ id, onClose, onModify }) {
  const {
    values,
    handleChange,
    handleChangeFiles,
    handleSubmit,
    setValues,
  } = useForm(createOrUpdate, validate, initialValues);

  async function createOrUpdate() {
    const close = await onModify(values);
    if (close) {
      onClose();
    }
  }

  async function getArea() {
    try {
      const response = await getObject3DById(id);

      let objeto = [];
      if (response.data.data.url) {
        objeto = [
          {
            name: `${response.data.data.nombre}-${
              response.data.data.url.split('\\')[1]
            }`,
          },
        ];
      }

      const data = {
        id,
        nombre: response.data.data.nombre,
        objeto,
        pathImagen: response.data.data.imagenPrevia,
      };
      setValues(data);
    } catch (e) {
      // console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      getArea();
    }
  }, []);

  const handleCloseItemobjeto = idx => {
    values.objeto.splice(idx, 1);
    setValues(valuesTmp => ({
      ...valuesTmp,
      objeto: values.objeto,
    }));
  };

  const imagePath = values.pathImagen
    ? values.pathImagen.replace(/\\/g, '/').trim()
    : '';

  const imagen = values.imagen ? values.imagen[0] : null;

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
        <Title>{id ? 'Edit Object' : 'New Object'} </Title>
        <FormContainer onSubmit={handleSubmit}>
          <ContainerInput>
            <ContainerLabel>
              <Label>Image</Label>
            </ContainerLabel>
            <Upload
              name="imagen"
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
          <ContainerInput>
            <ContainerLabel>
              <Label>Object</Label>
            </ContainerLabel>
            <UploadInput
              name="objeto"
              accept=".glb"
              message="Select file"
              value={values.objeto}
              onCloseItem={handleCloseItemobjeto}
              onChange={handleChangeFiles}
            />
          </ContainerInput>
          <Footer>
            <BtnSave>Save</BtnSave>
          </Footer>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
}

ContainerModifyObjeto3D.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
  onModify: PropTypes.func,
};

export default ContainerModifyObjeto3D;
