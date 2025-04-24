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
import List from 'components/ListAdminGrupoControlDetalle';
import Button from 'components/Button';
import AButton from 'components/AButton';
import Modal from 'components/Modal';
import ModifyDetail from 'components/ContainerModifyAlarmInterlockDetail';
import { darken } from 'polished';

import {
  getAlarmInterlock,
  getDetailAlarmInterlock,
} from 'services/AlarmsInterlocksService';

import {
  deleteDetailAlarmInterlock,
  createDetailAlarmInterlock,
  updateDetailAlarmInterlock,
} from 'services/DetailAlarmsInterlocksService';

/* Hooks */
import useForm from 'hooks/useForm';

const Container = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  transition: width 0.2s, height 0.4s;
  /* margin-bottom: -32px;
  margin-top: -32px; */
  background: #eee;
  overflow: hidden;
  display: flex;
`;

const ButtonAdd = styled(Button)`
  background: ${({ theme }) => darken('0.1', theme.colors.primary)};
  border-bottom: 5px solid ${({ theme }) => darken('0.3', theme.colors.primary)};
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => darken('0.1', theme.colors.primary)};
    border-bottom: 0px;
  }
`;

const ContainerButtonAdd = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
`;

const ContainerList = styled.div`
  flex-grow: 1;
  padding: 40px 16px 10px 16px;
  overflow: auto;
  display: ${({ display }) => display};
  flex-direction: column;
`;

const InnerContainer = styled.div`
  padding: 16px;
  height: 100%;
  flex-shrink: 0;
  width: ${({ width }) => `${width}px`};
  background: ${({ theme }) => theme.colors.base};
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

function ContainerModifyFolder({ id, onClose, onModify, isAlarm }) {
  const { values, handleChange, handleSubmit, setValues } = useForm(
    createOrUpdate,
    validate,
    initialValues,
  );

  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState('auto');
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState('none');
  const [isOpenAModal, setIsOpenAModal] = useState(false);
  const [isOpenEModal, setIsOpenEModal] = useState(false);
  const [idEnclavamientoAlarma, setIdEnclavamientoAlarma] = useState(-1);
  const [detalle, setDetalle] = useState([]);
  const [alarm, setAlarm] = useState(false);
  const [idDetalle, setIdDetalle] = useState(-1);

  const openAModal = () => setIsOpenAModal(true);
  const closeAModal = () => setIsOpenAModal(false);
  const openEModal = () => setIsOpenEModal(true);
  const closeEModal = () => setIsOpenEModal(false);

  async function createOrUpdate() {
    const data = await onModify(values);
    if (!id) {
      setIdEnclavamientoAlarma(data.idEnclavamientoAlarma);
    }
    if (data) {
      // onClose();
      enableModeDetail();
    }
  }

  const enableModeDetail = () => {
    setWidth(950);
    setHeight(700);
    setOpen(true);
    setDisplay('flex');
  };

  async function getArea() {
    try {
      const response = await getAlarmInterlock(id);
      setAlarm(response.data.data.isAlarm)
      setValues(response.data.data);
    } catch (e) {
      //   console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      enableModeDetail();
      getArea();
      setIdEnclavamientoAlarma(id);
    }
  }, []);

  const getDetailAlarmInterlockList = async () => {
    const response = await getDetailAlarmInterlock(idEnclavamientoAlarma);
    setDetalle(response.data.data);
  };

  const onEditHandler = idx => {
    openEModal();
    setIdDetalle(idx);
  };

  const onDeleteHandler = async idx => {
    try {
      await deleteDetailAlarmInterlock(idx);
      getDetailAlarmInterlockList();
    } catch { }
  };

  const onAddDetailHandler = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('condicion', valuesTmp.condicion);
    bodyFormData.set('tipoEnclavamiento', valuesTmp.tipoEnclavamiento);
    bodyFormData.set('alarma', valuesTmp.alarma);
    bodyFormData.set('consecuencia', valuesTmp.consecuencia);
    bodyFormData.set('solucion', valuesTmp.solucion);
    bodyFormData.set('falla', valuesTmp.falla);
    bodyFormData.set('valor', valuesTmp.valor);
    bodyFormData.set('idEnclavamientoAlarma', idEnclavamientoAlarma);
    // bodyFormData.set('idGrupoControl', idSelectedControlGroup);

    try {
      const response = await createDetailAlarmInterlock(bodyFormData);
      getDetailAlarmInterlockList(0);
      return response.data.data;
    } catch (ex) {
      return false;
    }
  };

  const onEditDetailHandler = async valuesTmp => {
    // console.log(valuesTmp);
    const bodyFormData = new FormData();
    bodyFormData.set(
      'idDetalleEnclavamiento',
      valuesTmp.idDetalleEnclavamiento,
    );
    bodyFormData.set('condicion', valuesTmp.condicion);
    bodyFormData.set('tipoEnclavamiento', valuesTmp.tipoEnclavamiento);
    bodyFormData.set('alarma', valuesTmp.alarma);
    bodyFormData.set('consecuencia', valuesTmp.consecuencia);
    bodyFormData.set('solucion', valuesTmp.solucion);
    bodyFormData.set('falla', valuesTmp.falla);
    bodyFormData.set('valor', valuesTmp.valor);
    bodyFormData.set('idEnclavamientoAlarma', idEnclavamientoAlarma);

    try {
      const response = await updateDetailAlarmInterlock(
        valuesTmp.idDetalleEnclavamiento,
        bodyFormData,
      );
      getDetailAlarmInterlockList(0);
      return response.data.data;
    } catch (ex) {
      //console.log("Error al actualizar datos:", ex)
      return false;
    }
  };

  useEffect(
    () => {
      if (idEnclavamientoAlarma > 0) {
        getDetailAlarmInterlockList();
      }
    },
    [idEnclavamientoAlarma, idEnclavamientoAlarma],
  );

  return (
    <Container width={width} height={height}>
      <InnerContainer width={!open ? width : width * 0.3}>
        <Title>
          {id ? 'Edit ' : 'New '}
          {isAlarm ? 'Alarm' : 'Interlock'}
        </Title>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            labelText={isAlarm ? "Tag" : "Abbr"}
            name="nombre"
            value={values.nombre || ''}
            onChange={handleChange}
          />
          <Input
            labelText="Id"
            name="idItem"
            value={values.idItem || ''}
            onChange={handleChange}
          />
          <Input
            labelText="Instrument"
            name="instrumento"
            value={values.instrumento || ''}
            onChange={handleChange}
          />
          <Footer>
            {/* <BtnCancel onClick={onClose}>Cancelar</BtnCancel> */}
            <BtnSave>Save</BtnSave>
          </Footer>
        </FormContainer>
      </InnerContainer>
      <ContainerList display={display}>
        <ContainerButtonAdd>
          <ButtonAdd onClick={openAModal}>Add details</ButtonAdd>
        </ContainerButtonAdd>
        <List
          onEdit={onEditHandler}
          onDelete={onDeleteHandler}
          detalle={detalle}
          isAlarm={alarm}
        />
      </ContainerList>
      <Modal open={isOpenAModal} onClose={closeAModal}>
        <ModifyDetail onModify={onAddDetailHandler} onClose={closeAModal} isAlarm={isAlarm} />
      </Modal>
      <Modal open={isOpenEModal} onClose={closeEModal}>
        <ModifyDetail
          id={idDetalle}
          onModify={onEditDetailHandler}
          onClose={closeEModal}
          isAlarm={isAlarm}
        />
      </Modal>
    </Container>
  );
}

ContainerModifyFolder.propTypes = {
  id: PropTypes.any,
  onClose: PropTypes.func,
  onModify: PropTypes.func,
};

export default ContainerModifyFolder;
