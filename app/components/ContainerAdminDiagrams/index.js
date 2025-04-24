import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md/index.esm';

import Modal from 'components/Modal';
import ModifyDiagram from 'components/ContainerModifyDiagram';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
import Table from 'V2/components/Table';

import {
  getAllDiagrams,
  createDiagram,
  updateDiagram,
  deleteDiagram,
} from 'services/DiagramasService';

function ContainerAdminDiagrams() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [diagrams, setDiagrams] = useState([]);
  const [modalState, setModalState] = useState({
    isOpenModalE: false,
    isOpenModalA: false,
    idEditDiagram: -1,
  });


  const options = {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      // console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      setUploadProgress(percent);
    }
  }

  const getDiagrams = async () => {
    try {
      const response = await getAllDiagrams();
      setDiagrams(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDiagrams();
  }, []);

  const openModalEditDiagram = id => {
    setModalState(p => ({
      ...p,
      isOpenModalE: true,
      idEditDiagram: id,
    }));
  };
  const closeModalEditDiagram = () => {
    setUploadProgress(0);
    setModalState(p => ({
      ...p,
      isOpenModalE: false,
    }));
  };

  const handleDeleteDiagram = async idx => {
    try {
      await deleteDiagram(idx);
      getDiagrams();
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddDiagram = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', valuesTmp.nombre);
    bodyFormData.set('zip', valuesTmp.diagrama && valuesTmp.diagrama[0]);
    bodyFormData.set('foto', valuesTmp.imagen && valuesTmp.imagen[0]);

    try {
      const response = await createDiagram(bodyFormData, options);
      getDiagrams();
      return response.data.data;
    } catch (ex) {
      return false;
    }
  };
  const handleEditDiagram = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('idDiagramaFlujo', modalState.idEditDiagram);
    bodyFormData.set('nombre', valuesTmp.nombre);
    bodyFormData.set('zip', valuesTmp.diagrama && valuesTmp.diagrama[0]);
    bodyFormData.set('foto', valuesTmp.imagen && valuesTmp.imagen[0]);

    try {
      const response = await updateDiagram(
        modalState.idEditDiagram,
        bodyFormData,
        options
      );
      getDiagrams();
      return response.data.data;
    } catch (ex) {
      return false;
    }
  };

  const openModalAddVideo = () => {
    setModalState(p => ({
      ...p,
      isOpenModalA: true,
    }));
  };
  const closeModalAddDiagram = () => {
    setUploadProgress(0);
    setModalState(p => ({
      ...p,
      isOpenModalA: false,
    }));
  };

  const titles = [
    {
      key: 'nombre',
      value: 'Name',
    },
  ];

  const actions = [
    {
      action: 'edit',
      value: 'id',
      onClick: openModalEditDiagram,
    },
    {
      action: 'delete',
      value: 'id',
      onClick: handleDeleteDiagram,
    },
  ];

  return (
    <>
      <ActionsContainer>
        <Button onClick={openModalAddVideo}>
          <MdAdd />
          New Diagram
        </Button>
      </ActionsContainer>

      <Table titles={titles} data={diagrams} actions={actions} />

      <Modal open={modalState.isOpenModalA} onClose={closeModalAddDiagram}>
        <ModifyDiagram
          onModify={handleAddDiagram}
          onClose={closeModalAddDiagram}
          uploadProgress={uploadProgress}
        />
      </Modal>

      <Modal open={modalState.isOpenModalE} onClose={closeModalEditDiagram}>
        <ModifyDiagram
          onModify={handleEditDiagram}
          id={modalState.idEditDiagram}
          onClose={closeModalEditDiagram}
          uploadProgress={uploadProgress}
        />
      </Modal>
    </>
  );
}

ContainerAdminDiagrams.propTypes = {};

export default ContainerAdminDiagrams;
