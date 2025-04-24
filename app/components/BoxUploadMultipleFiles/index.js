/**
 *
 * BoxUploadMultipleFiles
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import Button from 'components/Button';
import { Label } from 'components/Input';
import Select from 'components/Select';
import ProgressBar from 'components/ProgressBar';
// import AButton from 'components/AButton';
import UploadInput from 'components/UploadFilesInputInline';

import { createMedio } from 'services/MediosService';
import { getAllMediaTypes } from 'services/TiposMedioService';

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 16px;
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

const Container = styled.div`
  margin-bottom: -32px;
  width: 500px;
  margin-top: -32px;
  background: ${({ theme }) => theme.colors.base};
  overflow: hidden;
  padding: 16px;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  display: flex;
`;

const BtnUpload = styled(Button)`
  background: #3ce35f;
  border-bottom: 5px solid ${darken('0.1', '#3ce35f')};
  transition: all 0.3s ease;
  &:hover {
    background: #3ce35f;
    border-bottom: 0px;
  }
`;

const Loaded = styled.span`
  background: #3ce35f;
  padding: 0px 6px;
`;

const Loading = styled.div`
  width: 100px;
`;

const ErrorLoad = styled.span`
  background: red;
  padding: 0px 6px;
`;

const getAcceptedFiles = (oldFiles, newFiles) => {
  const acceptedFiles = [];
  acceptedFiles.push(...oldFiles);
  if (oldFiles.length > 0) {
    newFiles.forEach(newFile => {
      let foundFile = false;
      oldFiles.forEach(file => {
        if (file.name === newFile.name && file.size === newFile.size) {
          foundFile = true;
        }
      });

      if (!foundFile) acceptedFiles.push(newFile);
    });
  } else {
    acceptedFiles.push(...newFiles);
  }

  return acceptedFiles;
};

const getFilesWithCorrectTypes = (extensions, files) => {
  const newFiles = [];
  extensions.forEach(extension => {

    if (extension === "image/*") {

    }
    const filteredFiles = files.filter(fileItem => {
      const ext = fileItem.name.split('.').pop();

      if (extension === "image/*") {
        return ["jpg", "jpeg", "png", "gif"].includes(ext);
      } else {
        return extension === ext;
      }
    });

    newFiles.push(...filteredFiles);
  });

  return newFiles;
};

function BoxUploadMultipleFiles({ idArbol, onSave, onClose }) {
  const [values, setValues] = useState({});
  const [tipos, setTipos] = useState([]);

  const getTypesMedia = async () => {
    try {
      const response = await getAllMediaTypes();
      const options = [];
      response.data.data.forEach(tipo => {
        options.push({
          key: tipo.idTipoMedio,
          value: tipo.nombre,
          extensiones: tipo.extensiones,
        });
      });
      setTipos(options);
      if (options) {
        setValues(v => ({
          ...v,
          tipo: options[0].key,
          accept: options[0].extensiones.trim(),
        }));
      }
    } catch {
      // console.log('error');
    }
  };

  const handleChangeType = e => {
    // console.log(e.target.value);
    e.persist();

    const option = tipos.find(
      el => el.key.toString() === e.target.value.toString(),
    );

    setValues({
      tipo: e.target.value,
      accept: option.extensiones.trim(),
    });
    // console.log(e.target.value);
  };

  const onUpload = () => {

    const options = (idFile) => ({
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        // console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setValues(v => ({ ...v, [`${idFile}-progress`]: percent }));
      }
    })

    values.archivos.forEach(async (file, idx) => {

      const idFile = `${idx}file`
      setValues(v => ({ ...v, [`${idFile}-progress`]: 0 }));
      setValues(v => ({ ...v, [idFile]: 'Cargando' }));

      const bodyFormData = new FormData();
      bodyFormData.set('nombre', file.name);
      bodyFormData.set('estado', true);
      bodyFormData.set('idMediosPadre', idArbol);
      bodyFormData.set('IdTipoMedio', values.tipo);
      bodyFormData.set('Orden', 1);
      bodyFormData.set('archivo', file);


      createMedio(bodyFormData, options(idFile)).then(() => {
        onSave();
        // setValues(v => ({ ...v, [idFile]: 'Cargado' }));
      }).catch(() => {
        setValues(v => ({ ...v, [idFile]: 'Error' }));
      }).finally(() => {
        const filtered = arc => arc.filter(value => value.name !== file.name);
        setValues(v => ({
          ...v,
          tipo: values.tipo,
          archivos: filtered(v.archivos),
        }));
        // setValues(v => ({ ...v, [`${idFile}-progress`]: 0 }));
      })

      // try {
      //   await createMedio(bodyFormData, options);
      //   setValues(v => ({ ...v, [`${idx}file`]: 'Cargado' }));
      //   onSave();
      // } catch (e) {
      //   console.log(e);
      //   setValues(v => ({ ...v, [`${idx}file`]: 'Error' }));
      // } finally {
      //   const filtered = arc => arc.filter(value => value.name !== file.name);
      //   setValues(v => ({
      //     tipo: values.tipo,
      //     archivos: filtered(v.archivos),
      //   }));
      // }
    });
  };

  const handleCloseItem = idx => {
    values.archivos.splice(idx, 1);
    setValues(valuesTmp => ({
      ...valuesTmp,
      archivos: values.archivos,
    }));
  };

  useEffect(() => {
    getTypesMedia();
  }, []);

  // console.log(values);
  const handleChangeInput = e => {
    e.persist();
    const extensions = values.accept.replace(/\./g, '').split(',');

    const newFiles = getFilesWithCorrectTypes(extensions, [...e.target.files]);

    setValues(v => ({
      ...v,
      [e.target.name]: v.archivos
        ? getAcceptedFiles(v.archivos, newFiles)
        : newFiles,
    }));
  };

  const getStateUpload = value => {

    console.log(value);
    const state = values[value];
    const percent = values[`${value}-progress`];
    if (state === 'Cargado') {
      return <Loaded>Subido</Loaded>;
    }

    if (state === 'Cargando') {
      return <Loading><ProgressBar showMessage={false} uploadProgress={percent} /></Loading>;
    }

    if (state === 'Error') {
      return <ErrorLoad>Error</ErrorLoad>;
    }

    return '';
  };

  return (
    <React.Fragment>
      <Container>
      <Title>Upload Media</Title>
        <ContainerInput>
          <ContainerLabel>
            <Label>Type</Label>
          </ContainerLabel>
          <Select
            name="tipo"
            value={values.tipo || ''}
            onChange={handleChangeType}
            options={tipos}
          />
        </ContainerInput>
        <ContainerInput>
          <ContainerLabel>
            <Label>Files</Label>
          </ContainerLabel>

          <UploadInput
            accept={values.accept}
            multiple="multiple"
            value={values.archivos}
            name="archivos"
            message="Search files"
            onStateUpload={getStateUpload}
            onChange={handleChangeInput}
            onCloseItem={handleCloseItem}
          />
        </ContainerInput>

        <Footer>
          <BtnUpload onClick={onUpload}>Upload</BtnUpload>
        </Footer>
      </Container>
    </React.Fragment>
  );
}

BoxUploadMultipleFiles.propTypes = {
  idArbol: PropTypes.any,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default BoxUploadMultipleFiles;
