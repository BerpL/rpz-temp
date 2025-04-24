/**
 *
 * ContainerModifyDocument
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
import { darken } from 'polished';

import { getDocumentById } from 'services/DocumentService';

/* Hooks */
import useForm from 'hooks/useForm';

import Check from './Check';

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
      const response = await getDocumentById(id);
      let pdf = [];
      let docx = [];
      if (response.data.data.pdf) {
        pdf = [
          {
            name: `${response.data.data.nombre}-${response.data.data.pdf.url.split('\\')[1]
              }`,
          },
        ];
      }

      if (response.data.data.docx) {
        docx = [
          {
            name: `${response.data.data.nombre}-${response.data.data.docx.url.split('\\')[1]
              }`,
          },
        ];
      }

      const data = {
        id,
        nombre: response.data.data.nombre,
        visualizar: response.data.data.habilitarPdf,
        estado: response.data.data.estado,
        idArbol: response.data.data.idArbol,
        pdf,
        docx,
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

  const handleCloseItemPdf = idx => {
    values.pdf.splice(idx, 1);
    setValues(valuesTmp => ({
      ...valuesTmp,
      pdf: values.pdf,
    }));
  };

  const handleCloseItemDocx = idx => {
    values.docx.splice(idx, 1);
    setValues(valuesTmp => ({
      ...valuesTmp,
      docx: values.docx,
    }));
  };

  const renderBar = useMemo(() => {
    if (!isUploading) return;
    return <ProgressBar uploadProgress={uploadProgress} />
  }, [uploadProgress])


  return (
    <Container>
      <InnerContainer>
        <Title>{id ? 'Edit Document' : 'New Document'} </Title>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            labelText="Name"
            name="nombre"
            value={values.nombre || ''}
            onChange={handleChange}
          />
          <ContainerInput>
            <ContainerLabel>
              <Label>Reading Document</Label>
            </ContainerLabel>
            <UploadInput
              name="pdf"
              accept=".pdf"
              message="Select file"
              value={values.pdf}
              onCloseItem={handleCloseItemPdf}
              onChange={handleChangeFiles}
            />
          </ContainerInput>
          <ContainerInput>
            <ContainerLabel>
              <Label>Source Document</Label>
            </ContainerLabel>
            <UploadInput
              name="docx"
              accept=".doc,.docx"
              message="Select file"
              value={values.docx}
              onCloseItem={handleCloseItemDocx}
              onChange={handleChangeFiles}
            />
          </ContainerInput>
          <ContainerInput>
            <Check
              name="visualizar"
              checked={values.visualizar}
              onChange={handleChange}
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

export default memo(ContainerModifyDocument);
