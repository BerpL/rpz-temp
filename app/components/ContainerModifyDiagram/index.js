/**
 *
 * ContainerModifyDiagram
 *
 */

import React, { useEffect, useMemo, useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** COMPONENTES */
import ProgressBar from 'components/ProgressBar';
import Form from 'components/Form';
import Input from 'components/Input/GroupInput';
import { Label } from 'components/Input';
import Button from 'components/Button';
import UploadInput from 'components/UploadFilesInputInline';
import AButton from 'components/AButton';
import Upload from 'components/UploadImageInput';
import { darken } from 'polished';

import { getDiagramById } from 'services/DiagramasService';
import useForm from 'hooks/useForm';
import { hostUrlBase } from 'services/Api';
/* Hooks */

const Container = styled.div`
  width: 400px;
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
    errors.nombre = 'Añade un nombre';
  }

  return errors;
};

const initialValues = {
  nombre: '',
};

function ContainerModifyDiagram({ id, onClose, onModify, uploadProgress = 0 }) {
  const {
    values,
    handleChange,
    handleChangeFiles,
    handleSubmit,
    setValues,
  } = useForm(createOrUpdate, validate, initialValues);

  const [isUploading, setIsUploading] = useState(false);

  async function createOrUpdate() {
    setIsUploading(true);
    const close = await onModify(values);
    if (close) {
      onClose();
      setIsUploading(false);
    }
  }

  async function getArea() {
    try {
      const response = await getDiagramById(id);
      // console.log(response.data.data.url.split('\\'));

      let diagrama = [];
      if (response.data.data.url) {
        diagrama = [
          {
            name: `${response.data.data.nombre}-${response.data.data.url.split('\\')[1]}/index.html`,
          },
        ];
      }

      const data = {
        id,
        nombre: response.data.data.nombre,
        diagrama,
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

  const handleCloseItemDiagram = idx => {
    values.diagrama.splice(idx, 1);
    setValues(valuesTmp => ({
      ...valuesTmp,
      diagrama: values.diagrama,
    }));
  };

  const getUrlImage = useMemo(() => {
    if (!values.pathImagen && !values.imagen) return '';

    if (values.imagen) {
      const imagen = values.imagen[0];
      return URL.createObjectURL(imagen);
    }

    if (values.pathImagen) {
      const imagePath = values.pathImagen.replace(/\\/g, '/').trim()
      return `${hostUrlBase}/${imagePath}`;
    }
    return '';
  }, [values]);

  const renderBar = useMemo(() => {
    if (!isUploading) return;
    return <ProgressBar uploadProgress={uploadProgress} />
  }, [uploadProgress])

  return (
    <Container>
      <InnerContainer>
      <Title>
        {id ? 'Edit Flow Diagram' : 'New Flow Diagram'}{' '}
      </Title>
        <FormContainer onSubmit={handleSubmit}>
          <ContainerInput>
            <ContainerLabel>
              <Label>Image</Label>
            </ContainerLabel>
            <Upload
              name="imagen"
              onChange={handleChangeFiles}
              value={getUrlImage}
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
              <Label>Diagram</Label>
            </ContainerLabel>
            <UploadInput
              name="diagrama"
              accept=".zip"
              message="Select file"
              value={values.diagrama}
              onCloseItem={handleCloseItemDiagram}
              onChange={handleChangeFiles}
            />
          </ContainerInput>
          {renderBar}
          <Footer>
            {/* <BtnCancel onClick={onClose}>Cancelar</BtnCancel> */}
            <BtnSave disabled={isUploading}>Save</BtnSave>
          </Footer>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
}

ContainerModifyDiagram.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
  onModify: PropTypes.func,
};

export default memo(ContainerModifyDiagram);
