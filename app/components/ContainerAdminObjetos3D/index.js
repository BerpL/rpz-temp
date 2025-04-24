/**
 *
 * ContainerAdminObjects3D
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'components/Modal';

import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';

import Button from 'components/Button';
import { IoIosAddCircle, IoIosSearch } from 'react-icons/io/index.esm';
import Sticky from 'react-sticky-el';
import NavbarAdmin from 'components/NavbarAdmin';
import List from 'components/ListAdminObjetos3D';
import Modifyobject from 'components/ContainerModifyObjeto3D';
import { darken, lighten } from 'polished';

import {
  getAllObject3Ds,
  createObject3D,
  updateObject3D,
  deleteObject3D,
} from 'services/Objeto3DService';

const ButtonStyled = styled(Button)`
  display: inline-block;
  width: auto;
`;

function ContainerAdminObjects3D() {
  const [objetos, setObjetos] = useState([]);
  const [modalState, setModalState] = useState({
    isOpenModalE: false,
    isOpenModalA: false,
    idEditObject: -1,
  });

  const getObjetos = async () => {
    try {
      const response = await getAllObject3Ds();
      setObjetos(response.data.data);
    } catch { }
  };

  useEffect(() => {
    getObjetos();
  }, []);

  const openModalEditObject = id => {
    setModalState(p => ({
      ...p,
      isOpenModalE: true,
      idEditObject: id,
    }));
  };
  const closeModalEditObject = () => {
    setModalState(p => ({
      ...p,
      isOpenModalE: false,
    }));
  };

  const handleDeleteObject = async idx => {
    try {
      await deleteObject3D(idx);
      getObjetos();
    } catch { }
  };
  const handleAddObject = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', valuesTmp.nombre);
    bodyFormData.set('file3d', valuesTmp.objeto && valuesTmp.objeto[0]);
    bodyFormData.set('foto', valuesTmp.imagen && valuesTmp.imagen[0]);
    const config = {
      onUploadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
      },
      timeout: 50000,
    };

    try {
      const response = await createObject3D(bodyFormData, config);
      getObjetos();
      return response.data.data;
    } catch (ex) {
      return false;
    }
  };
  const handleEditObject = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('idObjeto', modalState.idEditObject);
    bodyFormData.set('nombre', valuesTmp.nombre);
    bodyFormData.set('file3d', valuesTmp.objeto && valuesTmp.objeto[0]);
    bodyFormData.set('foto', valuesTmp.imagen && valuesTmp.imagen[0]);
    const config = {
      onUploadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
      },
      timeout: 50000,
    };

    try {
      const response = await updateObject3D(
        modalState.idEditObject,
        bodyFormData,
        config,
      );
      getObjetos();
      return response.data.data;
    } catch (ex) {
      return false;
    }
  };

  const openModalAddObjeto = () => {
    setModalState(p => ({
      ...p,
      isOpenModalA: true,
    }));
  };
  const closeModalAddObject = () => {
    setModalState(p => ({
      ...p,
      isOpenModalA: false,
    }));
  };

  return (
  <ContainerFlex>
    <Sticky stickyStyle={{ zIndex: 100 }}>
      <Row height="65px" display="unset" width="100%">
        <NavbarAdmin>
          <Con
            width="1000px"
            maxWidth="1000px"
            flexDirection="row"
            flexGrow="1"
            alignItems="center"
            justifyContent="flex-start"
          >
            <ButtonStyled onClick={() => { }}>
              <IoIosSearch />
              Find a 3D object
            </ButtonStyled>
            <ButtonStyled onClick={openModalAddObjeto}>
              <IoIosAddCircle />
              New 3D Object
            </ButtonStyled>
          </Con>
        </NavbarAdmin>
      </Row>
    </Sticky>
    <Row flexGrow="1" height="100%" padding="40px 0 0 0">
      <Con
        maxWidth="1000px"
        height="100%"
        width="100%"
        display="flex"
        flexDirection="row"
      >
        <Col flexGrow="1" width="100%" padding="0">
          <List
            objects={objetos}
            onEdit={openModalEditObject}
            onDelete={handleDeleteObject}
          />
        </Col>
      </Con>
    </Row>
    <Modal open={modalState.isOpenModalA} onClose={closeModalAddObject}>
      <ModifyObject
        onModify={handleAddObject}
        onClose={closeModalAddObject}
      />
    </Modal>
    <Modal open={modalState.isOpenModalE} onClose={closeModalEditObject}>
      <ModifyObject
        onModify={handleEditObject}
        id={modalState.idEditObject}
        onClose={closeModalEditObject}
      />
    </Modal>
  </ContainerFlex>

  );
}

ContainerAdminObjects3D.propTypes = {};

export default ContainerAdminObjects3D;
