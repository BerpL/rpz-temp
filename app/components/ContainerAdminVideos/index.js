import React, { useState, useEffect, memo } from 'react';
import { MdAdd } from 'react-icons/md/index.esm';

import Modal from 'components/Modal';
import ModifyVideo from 'components/ContainerModifyVideo';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
import Table from 'V2/components/Table';

import {
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from 'services/VideosService';

function ContainerAdminVideos() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videos, setVideos] = useState([]);
  const [modalState, setModalState] = useState({
    isOpenModalE: false,
    isOpenModalA: false,
    idEditVideo: -1,
  });

  const getVideos = async () => {
    try {
      const response = await getAllVideos();
      setVideos(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const options = {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setUploadProgress(percent);
    },
  };

  const openModalEditVideo = id => {
    setModalState(p => ({
      ...p,
      isOpenModalE: true,
      idEditVideo: id,
    }));
  };

  const closeModalEditVideo = () => {
    setUploadProgress(0);
    setModalState(p => ({
      ...p,
      isOpenModalE: false,
    }));
  };

  const handleDeleteVideo = async idx => {
    try {
      await deleteVideo(idx);
      getVideos();
    } catch (e) {
      console.log(e);
    }
  };

  const confirmDeleteVideo = id => {
    confirmAlert({
      title: 'Delete Video',
      message: 'Do you want to delete this video?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteVideo(id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleAddVideo = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', valuesTmp.nombre);
    bodyFormData.set('vid', valuesTmp.video && valuesTmp.video[0]);
    bodyFormData.set('foto', valuesTmp.imagen && valuesTmp.imagen[0]);

    try {
      const response = await createVideo(bodyFormData, options);
      getVideos();
      return response.data.data;
    } catch (ex) {
      return false;
    }
  };

  const handleEditVideo = async valuesTmp => {
    const bodyFormData = new FormData();
    bodyFormData.set('idVideo', modalState.idEditVideo);
    bodyFormData.set('nombre', valuesTmp.nombre);
    bodyFormData.set('vid', valuesTmp.video && valuesTmp.video[0]);
    bodyFormData.set('foto', valuesTmp.imagen && valuesTmp.imagen[0]);

    try {
      const response = await updateVideo(modalState.idEditVideo, bodyFormData, options);
      getVideos();
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

  const closeModalAddVideo = () => {
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
      onClick: openModalEditVideo,
    },
    {
      action: 'delete',
      value: 'id',
      onClick: confirmDeleteVideo, // Cambiado para usar la confirmación
    },
  ];

  return (
    <>
      <ActionsContainer>
        <Button onClick={openModalAddVideo}>
          <MdAdd />
          New Video
        </Button>
      </ActionsContainer>

      <Table titles={titles} data={videos} actions={actions} />

      <Modal open={modalState.isOpenModalA} onClose={closeModalAddVideo}>
        <ModifyVideo onModify={handleAddVideo} onClose={closeModalAddVideo} uploadProgress={uploadProgress} />
      </Modal>

      <Modal open={modalState.isOpenModalE} onClose={closeModalEditVideo}>
        <ModifyVideo
          onModify={handleEditVideo}
          id={modalState.idEditVideo}
          onClose={closeModalEditVideo}
          uploadProgress={uploadProgress}
        />
      </Modal>
    </>
  );
}

ContainerAdminVideos.propTypes = {};

export default memo(ContainerAdminVideos);
