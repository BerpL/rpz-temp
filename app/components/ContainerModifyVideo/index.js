/**
 *
 * ContainerModifyMachinery
 *
 */

import React, { useEffect, useMemo, useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** COMPONENTES */
import Form from 'components/Form';
import ProgressBar from 'components/ProgressBar';
import Input from 'components/Input/GroupInput';
import { Label } from 'components/Input';
import { hostUrlBase } from 'services/Api';
import Button from 'components/Button';
import UploadInput from 'components/UploadFilesInputInline';
import AButton from 'components/AButton';
import Upload from 'components/UploadImageInput';
import { darken } from 'polished';

import { getVideoById, getImage } from 'services/VideosService';
import useForm from 'hooks/useForm';

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

function ContainerModifyMachinery({
  id,
  onClose,
  onModify,
  uploadProgress = 0,
}) {
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
      const response = await getVideoById(id);
      let video = [];
      if (response.data.data.url) {
        video = [
          {
            name: `${response.data.data.nombre}`,
          },
        ];
      }
      const responseImage = await getImage(response.data.data.imagenPrevia);
      const variable = URL.createObjectURL(responseImage.data);
      const data = {
        id,
        nombre: response.data.data.nombre,
        video,
        pathImagen: variable,
      };
      setValues(data);
      // console.log(data);
    } catch (e) {
      // console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      getArea();
    }
  }, []);

  const handleCloseItemVideo = idx => {
    values.video.splice(idx, 1);
    setValues(valuesTmp => ({
      ...valuesTmp,
      video: values.video,
    }));
  };

  const renderBar = useMemo(
    () => {
      if (!isUploading) return;
      return <ProgressBar uploadProgress={uploadProgress} />;
    },
    [uploadProgress],
  );

  const getUrlImage = useMemo(
    () => {
      if (!values.pathImagen && !values.imagen) return '';

      if (values.imagen) {
        const imagen = values.imagen[0];
        return URL.createObjectURL(imagen);
      }

      if (values.pathImagen) {
        return `${values.pathImagen}`;
      }
      return '';
    },
    [values],
  );

  return (
    <Container>
      <InnerContainer>
        <Title>{id ? 'Edit Video' : 'New Video'} </Title>
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
              <Label>Video</Label>
            </ContainerLabel>
            <UploadInput
              name="video"
              accept=".mpg4,.mp4,.avi"
              message="Select file"
              value={values.video}
              onCloseItem={handleCloseItemVideo}
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

ContainerModifyMachinery.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
  onModify: PropTypes.func,
};

export default memo(ContainerModifyMachinery);
