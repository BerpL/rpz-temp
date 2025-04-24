/**
 *
 * ContainerModifyDocument
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** COMPONENTES */
import ProgressBar from 'components/ProgressBar';
import Form from 'components/Form';
import Input from 'components/Input/GroupInput';
import { Label } from 'components/Input';
import Button from 'components/Button';
import UploadInput from 'components/UploadFilesInputInline';
import { darken } from 'polished';

import { getMedioById } from 'services/MediosService';

/* Hooks */
import useForm from 'hooks/useForm';

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
  visualizar: true,
};

function ContainerModifyDocument({ id, onClose, onModify, uploadProgress = 0 }) {
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
      const response = await getMedioById(id);

      const data = response.data.data;
      let archivo = [];
      if (data.url) {
        archivo = [
          {
            name: `${data.nombre}-${data.url.split('\\')[1]
              }`,
          },
        ];
      }

      const medioValues = {
        accept: data.idTipoMedioNavigation.extensiones.trim(),
        idMedio: id,
        nombre: data.nombre,
        idMediosPadre: data.idMediosPadre,
        idTipoMedio: data.idTipoMedio,
        orden: data.orden,
        estado: data.estado,
        archivo,
      };
      setValues(medioValues);
    } catch (e) {
      // console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      getArea();
    }
  }, []);

  const handleCloseItemPdf = idx => {
    values.archivo.splice(idx, 1);
    setValues(valuesTmp => ({
      ...valuesTmp,
      archivo: values.archivo,
    }));
  };

  const renderBar = useMemo(() => {
    if (!isUploading) return;
    return <ProgressBar uploadProgress={uploadProgress} />
  }, [uploadProgress])

  return (
    <Container>
      <InnerContainer>
        <Title>Edit Media</Title>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            labelText="Name"
            name="nombre"
            value={values.nombre || ''}
            onChange={handleChange}
          />
          <ContainerInput>
            <ContainerLabel>
              <Label>File</Label>
            </ContainerLabel>
            <UploadInput
              name="archivo"
              accept={values.accept}
              message="Select file"
              value={values.archivo}
              onCloseItem={handleCloseItemPdf}
              onChange={handleChangeFiles}
            />
          </ContainerInput>
          {renderBar}
          <Footer>
            {/* <BtnCancel onClick={onClose}>Cancel</BtnCancel> */}
            <BtnSave disabled={isUploading}>Save</BtnSave>
          </Footer>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
}

ContainerModifyDocument.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
  onModify: PropTypes.func,
};

export default ContainerModifyDocument;
