import React, { useState, useEffect, memo, useCallback } from 'react';
import _ from 'lodash';
import TreeView from 'components/TreeView';
import {
  ContextMenuModalFolder,
  CONSTANTS,
} from 'components/TreeAdminContextMenu';
import Modal from 'components/Modal';
import { Loader } from 'components/Loader';
import BoxUploadMultipleFiles from 'components/BoxUploadMultipleFiles';

import { useModal } from 'hooks/useModal';
import { ContainerFlex, Row, Col, Con } from 'components/ContainerFlex';
import List from 'components/ListAdminMedia';

import ModifyMediaFolder from 'components/ContainerModifyMediaFolder';
import ModifyMedia from 'components/ContainerModifyMedia';

import { deleteMedio, updateMedio } from 'services/MediosService';

// componentes V2
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';

import { MdAdd } from 'react-icons/md/index.esm';

import {
  getAllMediaTree,
  deleteMediaTree,
  createMediaTree,
  moveMediaTree,
  updateMediaTree,
  getMediosByArea,
} from 'services/ArbolMediosService';

import useTree from 'hooks/useTree';

function ContainerAdminMediaFileManager() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openAddFolder, setOpenAddFolder] = useState(false);
  const [openEditFolder, setOpenEditFolder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [treeData, setTreeData] = useState({ id: 0, nodos: [] });
  const [idEditF, setIdEditF] = useState(-1);
  const [idEditM, setIdEditM] = useState(-1);
  const [media, setMedia] = useState([]);

  const openModalAF = () => setOpenAddFolder(true);
  const closeModalAF = () => setOpenAddFolder(false);

  const openModalEF = () => setOpenEditFolder(true);
  const closeModalEF = () => setOpenEditFolder(false);

  const getTree = async () => {
    setIsLoading(true);
    try {
      const response = await getAllMediaTree();
      setTreeData(response.data.data);
      setIdEditF(response.data.data.id);
      // console.log(response.data.data);
      // setIdArea(response.data.data.id);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTree();
  }, []);

  const [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    findNode,
    onOpenNode,
    addNode,
    removeNode,
  ] = useTree({ data: treeData });

  const [isShowingModalUploadFiles, toggleModalUploadFiles] = useModal();
  const [isModify, toggleModify] = useModal();

  useEffect(
    () => {
      if (!isModify) setUploadProgress(0);
    },
    [isModify],
  );

  const handleClickNode = useCallback(id => {
    setIdEditF(id);
    onSelectNode(id);
  }, []);

  const handleClickFolderCM = async (event, data) => {
    const { type, identifier } = data;

    // setIdFolderActiveCM(identifier);
    setIdEditF(identifier);
    const nodeTmp = findNode(identifier);

    switch (type) {
      case CONSTANTS.NEW_FOLDER:
        return openModalAF();
      case CONSTANTS.EDIT_NAME_FOLDER:
        return openModalEF();
      case CONSTANTS.DELETE_FOLDER:
        await handleDelFolder(identifier, nodeTmp);
        return true;
      default:
        return null;
    }
  };

  const getMedia = async () => {
    try {
      const response = await getMediosByArea(idEditF);
      // console.log(response);
      setMedia(response.data.data);
    } catch {}
  };

  useEffect(
    () => {
      getMedia();
    },
    [idEditF],
  );

  const handleAddFolder = async name => {
    const newNode = {
      nombre: name,
      IdMediosPadre: idEditF,
      nodos: [],
    };
    try {
      const response = await createMediaTree(newNode);

      newNode.id = response.data.data.idMedio;
      addNode(newNode, idEditF);
      return true;
    } catch {
      return false;
    }
  };

  const handleEditFolder = async name => {
    const foundNode = findNode(idEditF);

    const editNode = {
      IdMedio: foundNode.id,
      nombre: name,
      IdMediosPadre: foundNode.idPadre,
      nodos: [],
    };
    try {
      await updateMediaTree(idEditF, editNode);
      foundNode.nombre = name;
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleDelFolder = async (identifier, nodeTmp) => {
    try {
      await deleteMediaTree(identifier);

      if (node.id === nodeTmp.id) {
        handleClickNode(node.parent.id);
      }
      removeNode(nodeTmp.id, nodeTmp.parent.id);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const handleSave = () => {
    getMedia();
  };

  const handleMoveNode = (from, to) => {
    const bodyFormData = new FormData();
    bodyFormData.set('to', to);
    onMoveNode(
      from,
      to,
      () => {},
      async canMove => {
        if (canMove) {
          try {
            await moveMediaTree(from, bodyFormData);
          } catch (ex) {}
        }
      },
    );
  };

  const handleDelete = async id => {
    try {
      await deleteMedio(id);
      getMedia();
    } catch {}
  };

  const options = {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      setUploadProgress(percent);
    },
  };

  const handleModify = async values => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('nombre', values.nombre);
      bodyFormData.set('estado', values.estado);
      bodyFormData.set('idMediosPadre', values.idMediosPadre);
      bodyFormData.set('idTipoMedio', values.idTipoMedio);
      bodyFormData.set('orden', 1);
      bodyFormData.set('archivo', values.archivo && values.archivo[0]);

      await updateMedio(idEditM, bodyFormData, options);

      getMedia();

      return true;
    } catch {
      return false;
    }
  };

  const handleEdit = id => {
    toggleModify();
    setIdEditM(id);
  };

  return (
    <ContainerFlex>
      {isLoading && <Loader />}
      <ActionsContainer>
        {/* <SearchBoxAdmin onChange={handleChange} ph="Buscar Nombres..." /> */}
        <Button onClick={toggleModalUploadFiles}>
          <MdAdd />
          Upload Media
        </Button>
      </ActionsContainer>

      <Row flexGrow="1" height="100%" padding="40px 0 0 0">
        <Con
          maxWidth="1200px"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="row"
        >
          <Col
            flexBasis="500px"
            flexShrink="0"
            flexGrow="0"
            display="unset"
            padding="0 16px 0 0"
            overflow="auto"
            height="calc(100vh - 150px)"
          >
            <TreeView
              onToggleItem={onOpenNode}
              items={tree}
              onClickItem={handleClickNode}
              moveItem={handleMoveNode}
              findItem={findNode}
            />
          </Col>
          <Col flexGrow="1" width="100%" padding="0">
            <Row flexGrow="1" height="100%" overflow="auto">
              <Col width="100%" padding="0">
                <List
                  media={media}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </Col>
            </Row>
          </Col>
        </Con>
      </Row>
      <ContextMenuModalFolder onClickItem={handleClickFolderCM} />
      <Modal open={openAddFolder} onClose={closeModalAF}>
        <ModifyMediaFolder onModify={handleAddFolder} onClose={closeModalAF} />
      </Modal>
      <Modal open={openEditFolder} onClose={closeModalEF}>
        <ModifyMediaFolder
          id={idEditF}
          onModify={handleEditFolder}
          onClose={closeModalEF}
        />
      </Modal>
      <Modal
        open={isShowingModalUploadFiles}
        onClose={() => toggleModalUploadFiles()}
      >
        <BoxUploadMultipleFiles
          idArbol={idEditF}
          onClose={() => toggleModalUploadFiles()}
          onSave={handleSave}
        />
      </Modal>

      <Modal open={isModify} onClose={() => toggleModify()}>
        <ModifyMedia
          id={idEditM}
          uploadProgress={uploadProgress}
          onClose={() => toggleModify()}
          onModify={handleModify}
        />
      </Modal>
    </ContainerFlex>
  );
}

ContainerAdminMediaFileManager.propTypes = {};

export default memo(ContainerAdminMediaFileManager);
